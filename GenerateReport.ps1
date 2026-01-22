# Generate HTML Report from JSON data
# Proxy Monitor - Generate HTML report from JSON data

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$jsonPath = Join-Path $PSScriptRoot "network_data.json"

if (-not (Test-Path $jsonPath)) {
    Write-Host "Error: Network data file not found!" -ForegroundColor Red
    Write-Host "Please run AnalyzeConnections.ps1 first to perform analysis." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit
}

Write-Host "Generating HTML report..." -ForegroundColor Yellow

# Read JSON data
$data = Get-Content $jsonPath -Raw | ConvertFrom-Json

# Generate HTML content
$htmlContent = @"
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proxy Monitor - Network Connection Analysis Report</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
        .refresh-btn {
            background: #667eea;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            margin: 10px;
        }
        .refresh-btn:hover { background: #5568d3; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Proxy Monitor - Network Connection Analysis</h1>
            <div class="date">Analysis Time: $($data.AnalysisTime)</div>
            <button class="refresh-btn" onclick="window.location.reload()">Refresh Report</button>
        </div>

        <div class="content">
            <div class="section">
                <h2>Overview</h2>
                <div class="summary-cards">
                    <div class="card">
                        <h3>Related Processes</h3>
                        <div class="value">$($data.Processes.Count)</div>
                    </div>
                    <div class="card">
                        <h3>Active Connections</h3>
                        <div class="value">$($data.Connections.Count)</div>
                    </div>
                    <div class="card">
                        <h3>Remote Servers</h3>
                        <div class="value">$($data.RemoteIPGroups.Count)</div>
                    </div>
                    <div class="card">
                        <h3>Total Memory Usage</h3>
                        <div class="value">$([math]::Round(($data.Processes | Measure-Object Memory -Sum).Sum, 2)) MB</div>
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
                            <th>CPU Usage</th>
                            <th>Memory Usage</th>
                            <th>Connections</th>
                        </tr>
                    </thead>
                    <tbody>
"@

foreach ($proc in $data.Processes) {
    $htmlContent += @"
                        <tr>
                            <td>$($proc.ProcessId)</td>
                            <td>$($proc.ProcessName)</td>
                            <td>$($proc.CPU)</td>
                            <td>$($proc.Memory) MB</td>
                            <td>$($proc.EstablishedConnections)</td>
                        </tr>
"@
}

$htmlContent += @"
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
"@

foreach ($ipGroup in $data.RemoteIPGroups) {
    $portStr = ($ipGroup.Ports -join ", ")
    $purpose = switch -Wildcard ($ipGroup.Ports) {
        "*443*" { "HTTPS encrypted connection (authentication/update)" }
        "*2481*" { "Custom protocol connection (data transfer)" }
        "*2482*" { "Custom protocol connection (auxiliary data)" }
        default { "Unknown purpose" }
    }
    $htmlContent += @"
                        <tr>
                            <td>$($ipGroup.IP)</td>
                            <td>$portStr</td>
                            <td>$($ipGroup.Count)</td>
                            <td>$purpose</td>
                        </tr>
"@
}

$htmlContent += @"
                    </tbody>
                </table>
            </div>

            <div class="section">
                <h2>Detailed Connection List</h2>
                <div class="connection-list">
"@

foreach ($conn in $data.Connections) {
    $htmlContent += @"
                    <div class="connection-item">
                        <div class="ip">$($conn.RemoteAddress):$($conn.RemotePort)</div>
                        <div class="details">
                            Process: $($conn.ProcessName) (PID: $($conn.ProcessId)) |
                            Local: $($conn.LocalAddress):$($conn.LocalPort) |
                            State: $($conn.State)
                        </div>
                    </div>
"@
}

$htmlContent += @"
                </div>
            </div>

            <div class="section">
                <h2>Traffic Consumption Analysis</h2>
                <div class="warning">
                    <h3>Reasons for High Traffic Consumption</h3>
                    <p><strong>1. Multiple concurrent connections:</strong> The system detected $($data.Connections.Count) active connections, including multiple parallel connections to the same server, indicating the application may be performing data sharding or multi-channel communication.</p>
                    <p><strong>2. Continuous data transfer:</strong> There are many connections on custom ports, which may be used for real-time data stream transfer, such as video streams or game screens.</p>
                    <p><strong>3. High memory usage:</strong> Total memory usage is $([math]::Round(($data.Processes | Measure-Object Memory -Sum).Sum, 2)) MB, indicating extensive data caching and processing operations.</p>
                </div>

                <div class="analysis">
                    <h3>Technical Analysis</h3>
                    <ul>
                        <li><strong>Port 443:</strong> Standard HTTPS port for encrypted communication, possibly used for authentication, configuration updates, or secure data transfer</li>
                        <li><strong>Custom Ports:</strong> Custom ports, possibly for streaming or data transfer channels</li>
                        <li><strong>Connection pattern:</strong> Multiple connections to different ports of the same server, using load balancing or data sharding strategy</li>
                        <li><strong>Process architecture:</strong> Includes main process, service process, health check daemon, and service components</li>
                    </ul>
                </div>
            </div>

            <div class="section">
                <h2>Optimization Recommendations</h2>
                <div class="analysis">
                    <h3>Ways to Reduce Traffic Consumption</h3>
                    <ul>
                        <li><strong>Adjust quality settings:</strong> If this is a streaming application, lowering quality or frame rate can significantly reduce traffic consumption</li>
                        <li><strong>Check auto-updates:</strong> Confirm if the application is automatically downloading updates or caching content in the background</li>
                        <li><strong>Limit bandwidth:</strong> Look for bandwidth limiting options in the application settings</li>
                        <li><strong>Disable unnecessary features:</strong> If the application has cloud sync, background recording, or other features, consider disabling them</li>
                        <li><strong>Monitor usage habits:</strong> Confirm if it continues running when not needed</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="footer">
            <p>This report is generated by Proxy Monitor</p>
            <p>Data collection time: $($data.AnalysisTime)</p>
        </div>
    </div>
</body>
</html>
"@

# Save HTML file
$htmlPath = Join-Path $PSScriptRoot "ProxyMonitorReport.html"
$htmlContent | Out-File -FilePath $htmlPath -Encoding UTF8

Write-Host ""
Write-Host "HTML report generated: $htmlPath" -ForegroundColor Green
Write-Host ""

# Auto-open report
Write-Host "Opening report..." -ForegroundColor Yellow
Start-Process $htmlPath

Write-Host ""
Write-Host "Done!" -ForegroundColor Green
Write-Host ""