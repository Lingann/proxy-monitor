# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2026-01-22

### Added
- Initial release of Proxy Monitor
- Network connection monitoring using Electron + TypeScript
- PowerShell integration for Windows network analysis
- HTML report generation for monitoring data
- Real-time network data collection and visualization
- Electron application with desktop integration
- TypeScript support for type safety
- Build configuration with electron-builder

### Features
- `AnalyzeConnections.ps1` - PowerShell script for network connection analysis
- `GenerateReport.ps1` - Generate HTML reports from network data
- `CreateShortcuts.ps1` - Create desktop shortcuts for the application
- Electron-based desktop application
- TypeScript compilation support
- Windows NSIS installer support

### Configuration
- `.gitignore` configured to exclude node_modules, dist, release, logs, and temporary files
- TypeScript configuration for compilation
- Electron builder configuration for packaging

### Scripts
- `npm run dev` - Development mode with TypeScript compilation
- `npm run build` - Compile TypeScript
- `npm run start` - Start Electron application
- `npm run dist` - Build distributable packages