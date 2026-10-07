# VectorIQ

VectorIQ is an AI-driven quantitative trading and market research platform designed for financial analysts, quantitative researchers, and algorithmic traders. It bridges advanced machine learning models with real-time market execution and risk management.

## Features

* **Next.js Framework** – Fast performance with server-side rendering and static generation.
* **Tailwind CSS** – Responsive, dark-mode optimized trading terminal UI.
* **AI Intelligence Terminal** – Unified workspace for market signals, research, and portfolio intelligence.
* **Mobile-First Design** – Optimized for retail and institutional traders.
* **Docker Support** – Production-ready containerization with multi-stage builds.

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) and npm installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/eliteqmengine-gif/VectorIQ.git
   cd VectorIQ
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Building for Production

```bash
npm run build
npm run start
```

### Docker

Build and run the application in a Docker container:

```bash
docker build -t vectoriq .
docker run -p 3000:3000 vectoriq
```

## Project Structure

- `app/` – Next.js app directory with pages and components
- `app/page.tsx` – Landing page with VectorIQ intelligence terminal UI
- `app/layout.tsx` – Root layout with metadata and analytics
- `app/globals.css` – Global styles and design system
- `public/` – Static assets
- `Dockerfile` – Multi-stage production build configuration

## Technologies

- **Next.js 14** – React framework
- **TypeScript** – Type-safe development
- **Tailwind CSS** – Utility-first styling
- **Vercel Analytics** – Performance monitoring

## Development

Run ESLint to check code quality:

```bash
npm run lint
```

## License

This project is private and proprietary.

## Support

For issues, feature requests, or security concerns, please refer to [SECURITY.md](./SECURITY.md).
