import { writeFileSync } from 'fs';
import { join } from 'path';
import type { NetworkAnalysisData } from '../shared/types';

export class ReportGenerator {
  generateHTML(data: NetworkAnalysisData): string {
    const totalMemory = data.processes.reduce((sum, p) => sum + p.memory, 0);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proxy Monitor - Network Connection Analysis</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            min-height: 100vh;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 { font-size: 32px; margin-bottom: 10px; }
        .header .date { font-size: 14px; opacity: 0.9; }
        .content { padding: 30px; }
        .section { margin-bottom: 40px; }
        .section h2 {
            color: #333;
            border-bottom: 3px solid #667eea;
            padding-bottom: 10px;
            margin-bottom: 20px;
            font-size: 24px;
        }
        .summary-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .card {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .card h3 { color: #555; font-size: 14px; margin-bottom: 10px; }
        .card .value { font-size: 28px; font-weight: bold; color: #667eea; }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th { background: #667eea; color: white; font-weight: 600; }
        tr:hover { background: #f5f5f5; }
        .ip-table th { background: #764ba2; }
        .connection-list { background: #f9f9f9; border-radius: 8px; padding: 20px; }
        .connection-item {
            background: white;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 5px;
            border-left: 4px solid #667eea;
        }
        .connection-item:last-child { margin-bottom: 0; }
        .connection-item .ip {
            font-size: 18px;
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }
        .connection-item .details { font-size: 14px; color: #666; }
        .warning {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
        }
        .warning h3 { color: #856404; margin-bottom: 10px; }
        .warning p { color: #856404; line-height: 1.6; }
        .analysis {
            background: #d4edda;
            border-left: 4px solid #28a745;
            padding: 20px;
            margin: 20px 0;
            border-radius: 5px;
        }
        .analysis h3 { color: #155724; margin-bottom: 15px; }
        .analysis ul { margin-left: 20px; color: #155724; line-height: 1.8; }
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #666;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Proxy Monitor - Network Connection Analysis</h1>
            <div class="date">Analysis Time: ${data.analysisTime}</div>
        </div>

        <div class="content">
            <div class="section">
                <h2>Overview</h2>
                <div class="summary-cards">
                    <div class="card">
                        <h3>Related Processes</h3>
                        <div class="value">${data.processes.length}</div>
                    </div>
                    <div class="card">
                        <h3>Active Connections</h3>
                        <div class="value">${data.connections.length}</div>
                    </div>
                    <div class="card">
                        <h3>Remote Servers</h3>
                        <div class="value">${data.remoteIPGroups.length}</div>
                    </div>
                    <div class="card">
                        <h3>Total Memory Usage</h3>
                        <div class="value">${totalMemory.toFixed(2)} MB</div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2>Process Information</h2>
                <table>
                    <thead>
                        <tr>
                            <th>PID</th>
                            <th>Process Name</th>
                            <th>Memory Usage</th>
                            <th>Connections</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.processes
                          .map(
                            (proc) => `
                        <tr>
                            <td>${proc.pid}</td>
                            <td>${proc.name}</td>
                            <td>${proc.memory.toFixed(2)} MB</td>
                            <td>${proc.establishedConnections}</td>
                        </tr>
                        `
                          )
                          .join('')}
                    </tbody>
                </table>
            </div>

            <div class="section">
                <h2>Remote Server Connections</h2>
                <table class="ip-table">
                    <thead>
                        <tr>
                            <th>IP Address</th>
                            <th>Ports</th>
                            <th>Connections</th>
                            <th>Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.remoteIPGroups
                          .map(
                            (group) => `
                        <tr>
                            <td>${group.ip}</td>
                            <td>${group.ports.join(', ')}</td>
                            <td>${group.count}</td>
                            <td>${this.getPurpose(group.ports)}</td>
                        </tr>
                        `
                          )
                          .join('')}
                    </tbody>
                </table>
            </div>

            <div class="section">
                <h2>Detailed Connection List</h2>
                <div class="connection-list">
                    ${data.connections
                      .map(
                        (conn) => `
                    <div class="connection-item">
                        <div class="ip">${conn.remoteAddress}:${conn.remotePort}</div>
                        <div class="details">
                            Process: ${conn.processName} (PID: ${conn.processId}) |
                            Local: ${conn.localAddress}:${conn.localPort} |
                            State: ${conn.state}
                        </div>
                    </div>
                        `
                      )
                      .join('')}
                </div>
            </div>

            <div class="section">
                <h2>Traffic Consumption Analysis</h2>
                <div class="warning">
                    <h3>Reasons for High Traffic Consumption</h3>
                    <p><strong>1. Multiple concurrent connections:</strong> The system detected ${data.connections.length} active connections, including multiple parallel connections to the same server.</p>
                    <p><strong>2. Continuous data transfer:</strong> There are many connections on custom ports, which may be used for real-time data stream transfer.</p>
                    <p><strong>3. High memory usage:</strong> Total memory usage is ${totalMemory.toFixed(2)} MB, indicating extensive data caching and processing operations.</p>
                </div>

                <div class="analysis">
                    <h3>Technical Analysis</h3>
                    <ul>
                        <li><strong>Port 443:</strong> Standard HTTPS port for encrypted communication</li>
                        <li><strong>Custom Ports:</strong> Custom ports for streaming or data transfer channels</li>
                        <li><strong>Connection pattern:</strong> Multiple connections using load balancing or data sharding</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="footer">
            <p>This report is generated by Proxy Monitor</p>
            <p>Data collection time: ${data.analysisTime}</p>
        </div>
    </div>
</body>
</html>`;
  }

  private getPurpose(ports: number[]): string {
    if (ports.includes(443)) return 'HTTPS encrypted connection';
    if (ports.some((p) => p >= 2400 && p <= 2500)) return 'Custom protocol connection';
    return 'Unknown purpose';
  }

  saveReport(data: NetworkAnalysisData, outputPath: string): void {
    const html = this.generateHTML(data);
    writeFileSync(outputPath, html, 'utf-8');
  }
}