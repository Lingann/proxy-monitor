# Proxy Monitor

A network connection monitoring tool built with Electron + TypeScript + pnpm.

## Features

- Monitor network connections of target processes
- Analyze remote server connections
- Generate detailed HTML reports
- Real-time statistics display
- Cross-platform desktop application

## Project Structure

```
proxy-monitor/
├── src/
│   ├── main/           # Electron main process
│   │   ├── index.ts
│   │   ├── network-analyzer.ts
│   │   └── report-generator.ts
│   ├── preload/        # Preload scripts
│   │   └── index.ts
│   ├── renderer/       # Renderer process (UI)
│   │   ├── index.html
│   │   ├── styles.css
│   │   ├── renderer.ts
│   │   └── global.d.ts
│   └── shared/         # Shared types
│       └── types.ts
├── dist/              # Compiled JavaScript
├── public/            # Static assets
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

```bash
# Install dependencies
pnpm install
```

## Development

```bash
# Compile TypeScript
pnpm run build

# Run in development mode
pnpm run dev

# Or use the batch file
run.bat
```

## Building for Distribution

```bash
# Build for production
pnpm run dist
```

This will create an installer in the `release/` directory.

## Configuration

To monitor different processes, edit the `NetworkAnalyzer` class in `src/main/network-analyzer.ts`:

```typescript
const networkAnalyzer = new NetworkAnalyzer(['YourProcessName']);
```

## Usage

1. Click "Analyze Connections" to scan network connections
2. View the results in the dashboard
3. Click "Generate Report" to export an HTML report

## Tech Stack

- **Electron** - Desktop application framework
- **TypeScript** - Type-safe JavaScript
- **pnpm** - Fast, disk space efficient package manager
- **Node.js** - Runtime environment

## License

MIT