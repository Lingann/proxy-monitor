# Proxy Monitor - Network Connection Analyzer
# Analyze network connections and traffic consumption for target processes

# Set output encoding to UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Proxy Monitor - Network Analyzer" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get current time
$currentTime = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
Write-Host "Analysis Time: $currentTime" -ForegroundColor Gray
Write-Host ""

# Find GameView related processes (can be modified for other processes)
Write-Host "Searching for target processes..." -ForegroundColor Yellow
$targetProcesses = Get-Process | Where-Object {
    $_.ProcessName -like "*GameView*" -or
    $_.ProcessName -like "*GameViewServer*" -or
    $_.ProcessName -like "*GameViewer*" -or
    $_.ProcessName -like "*proxy*"
}

if (-not $targetProcesses) {
    Write-Host ""
    Write-Host "No target processes found!" -ForegroundColor Red
    Write-Host "Please make sure the target process is running." -ForegroundColor Yellow
    Write-Host "You can modify the process filter in the script to monitor different processes." -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit
}

# Display found processes
Write-Host "Found $($targetProcesses.Count) related processes:" -ForegroundColor Green
$targetProcesses | Format-Table Id, ProcessName, CPU, @{Name="Memory(MB)";Expression={[math]::Round($_.WorkingSet64/1MB,2)}} -AutoSize

# Collect all connection information
Write-Host ""
Write-Host "Collecting network connection information..." -ForegroundColor Yellow

$allConnections = @()
$processDetails = @()

foreach ($proc in $targetProcesses) {
    $processId = $proc.Id
    $processName = $proc.ProcessName

    # Get connections for this process
    $connections = Get-NetTCPConnection | Where-Object { $_.OwningProcess -eq $processId }

    $establishedConnections = $connections | Where-Object { $_.State -eq "Established" }

    $processInfo = @{
        ProcessId = $processId
        ProcessName = $processName
        CPU = if ($proc.CPU) { [math]::Round($proc.CPU, 2) } else { "-" }
        Memory = [math]::Round($proc.WorkingSet64 / 1MB, 2)
        TotalConnections = $connections.Count
        EstablishedConnections = $establishedConnections.Count
    }

    $processDetails += $processInfo

    foreach ($conn in $establishedConnections) {
        $connInfo = @{
            ProcessId = $processId
            ProcessName = $processName
            LocalAddress = $conn.LocalAddress
            LocalPort = $conn.LocalPort
            RemoteAddress = $conn.RemoteAddress
            RemotePort = $conn.RemotePort
            State = $conn.State
        }
        $allConnections += $connInfo
    }
}

# Group by remote IP
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Connection Statistics" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$remoteIPGroups = $allConnections | Group-Object RemoteAddress | Sort-Object Count -Descending

Write-Host "Remote server connection statistics:" -ForegroundColor Yellow
foreach ($group in $remoteIPGroups) {
    $ip = $group.Name
    $count = $group.Count
    $ports = ($group.Group | ForEach-Object { $_.RemotePort } | Sort-Object -Unique) -join ", "
    Write-Host "  $ip - $count connections (ports: $ports)" -ForegroundColor Green
}

Write-Host ""
Write-Host "Total: $($allConnections.Count) active connections" -ForegroundColor Cyan
Write-Host ""

# Display process connection details
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Process Connection Details" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

foreach ($proc in $processDetails) {
    Write-Host "Process: $($proc.ProcessName) (PID: $($proc.ProcessId))" -ForegroundColor Yellow
    Write-Host "  CPU: $($proc.CPU) | Memory: $($proc.Memory) MB" -ForegroundColor Gray
    Write-Host "  Active connections: $($proc.EstablishedConnections)" -ForegroundColor Gray

    $procConnections = $allConnections | Where-Object { $_.ProcessId -eq $proc.ProcessId }
    if ($procConnections) {
        foreach ($conn in $procConnections) {
            Write-Host "    $($conn.LocalAddress):$($conn.LocalPort) -> $($conn.RemoteAddress):$($conn.RemotePort)" -ForegroundColor White
        }
    }
    Write-Host ""
}

# Save data to JSON file
$data = @{
    AnalysisTime = $currentTime
    Processes = $processDetails
    Connections = $allConnections
    RemoteIPGroups = $remoteIPGroups | ForEach-Object {
        @{
            IP = $_.Name
            Count = $_.Count
            Ports = ($_.Group | ForEach-Object { $_.RemotePort } | Sort-Object -Unique)
        }
    }
}

$jsonPath = Join-Path $PSScriptRoot "network_data.json"
$data | ConvertTo-Json -Depth 10 | Out-File -FilePath $jsonPath -Encoding UTF8
Write-Host "Data saved to: $jsonPath" -ForegroundColor Green

Write-Host ""
Write-Host "Analysis complete!" -ForegroundColor Green
Write-Host ""