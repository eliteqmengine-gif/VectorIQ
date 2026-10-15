import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Initialize Supabase client using env variables
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');

export default function LiveRiskChart() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch initial historical data from your table (e.g., portfolio limits or trade logs)
    async function fetchInitialData() {
      const { data, error } = await supabase
        .from('portfolio_limits')
        .select('updated_at, current_value, configured_limit')
        .order('updated_at', { ascending: true })
        .limit(50); // Fetch recent records

      if (error) {
        console.error('Error fetching initial chart data:', error);
      } else if (data) {
        // Format timestamps for display if needed
        const formatted = (data as any[]).map(item => ({
          time: new Date(item.updated_at).toLocaleTimeString(),
          current: Number(item.current_value),
          limit: Number(item.configured_limit)
        }));
        setChartData(formatted);
      }
      setLoading(false);
    }

    fetchInitialData();

    // 2. Set up the Supabase Realtime subscription
    const channel = supabase
      .channel('live-chart-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'portfolio_limits' },
        (payload) => {
          console.log('New live row received:', payload.new);
          const newItem = {
            time: new Date(payload.new.updated_at).toLocaleTimeString(),
            current: Number(payload.new.current_value),
            limit: Number(payload.new.configured_limit)
          };

          // Append new data point and keep the chart clean (e.g., max 50 items)
          setChartData((prevData) => [...prevData.slice(-49), newItem]);
        }
      )
      .subscribe();

    // 3. Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) return <div>Loading real-time chart feed...</div>;

  return (
    <div style={{ width: '100%', height: 400, background: '#111827', padding: '20px', borderRadius: '8px' }}>
      <h3 style={{ color: '#fff', marginBottom: '15px', fontFamily: 'sans-serif' }}>Live Portfolio Utilization</h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="time" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#fff' }} 
          />
          <Line type="monotone" dataKey="current" stroke="#3B82F6" strokeWidth={2} dot={false} name="Current Value" />
          <Line type="monotone" dataKey="limit" stroke="#EF4444" strokeDasharray="5 5" strokeWidth={2} dot={false} name="Configured Limit" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
