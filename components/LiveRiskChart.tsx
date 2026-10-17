"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartPoint = {
  time: string;
  current: number;
  limit: number;
};

const demoData: ChartPoint[] = [
  { time: "09:00", current: 120000, limit: 200000 },
  { time: "09:15", current: 135000, limit: 200000 },
  { time: "09:30", current: 150000, limit: 200000 },
  { time: "09:45", current: 145000, limit: 200000 },
  { time: "10:00", current: 170000, limit: 200000 },
];

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export default function LiveRiskChart() {
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getSupabaseClient();

    if (!supabase) {
      setChartData(demoData);
      setErrorMessage("Supabase environment variables are not configured.");
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function fetchInitialData() {
      try {
        const { data, error } = await supabase
          .from("portfolio_limits")
          .select("updated_at, current_value, configured_limit")
          .order("updated_at", { ascending: true })
          .limit(50);

        if (!isMounted) return;

        if (error) {
          throw error;
        }

        const formatted = (data ?? []).map((item: any) => ({
          time: item.updated_at
            ? new Date(item.updated_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "n/a",
          current: Number(item.current_value ?? 0),
          limit: Number(item.configured_limit ?? 0),
        }));

        setChartData(formatted.length > 0 ? formatted : demoData);
      } catch (fetchError) {
        console.error("Error fetching initial chart data:", fetchError);
        setChartData(demoData);
        setErrorMessage("Live chart is using demo data until Supabase is configured.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchInitialData();

    const channel = supabase
      .channel("live-chart-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "portfolio_limits" },
        (payload: any) => {
          const newItem: ChartPoint = {
            time: payload.new.updated_at
              ? new Date(payload.new.updated_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "now",
            current: Number(payload.new.current_value ?? 0),
            limit: Number(payload.new.configured_limit ?? 0),
          };

          setChartData((prevData) => [...prevData.slice(-49), newItem]);
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return <div style={{ color: "#fff" }}>Loading real-time chart feed...</div>;
  }

  return (
    <div
      style={{
        width: "100%",
        height: 400,
        background: "#111827",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid rgba(148, 163, 184, 0.2)",
      }}
    >
      <h3
        style={{
          color: "#fff",
          marginBottom: "15px",
          fontFamily: "sans-serif",
        }}
      >
        Live Portfolio Utilization
      </h3>

      {errorMessage ? (
        <p style={{ color: "#fbbf24", marginBottom: "12px", fontSize: 12 }}>
          {errorMessage}
        </p>
      ) : null}

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="time" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "none",
              color: "#fff",
            }}
          />
          <Line
            type="monotone"
            dataKey="current"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
            name="Current Value"
          />
          <Line
            type="monotone"
            dataKey="limit"
            stroke="#EF4444"
            strokeDasharray="5 5"
            strokeWidth={2}
            dot={false}
            name="Configured Limit"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
