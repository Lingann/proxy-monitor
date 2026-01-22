$WshShell = New-Object -ComObject WScript.Shell
$scriptPath = $PSScriptRoot
$desktopPath = [Environment]::GetFolderPath("Desktop")

Write-Host "Creating desktop shortcuts..." -ForegroundColor Yellow

# Create main tool shortcut
$shortcutPath = Join-Path $desktopPath "ProxyMonitor.lnk"
$shortcut = $WshShell.CreateShortcut($shortcutPath)
$shortcut.TargetPath = Join-Path $scriptPath "start.bat"
$shortcut.WorkingDirectory = $scriptPath
$shortcut.Description = "Proxy Monitor - Network Connection Analyzer"
$shortcut.IconLocation = "%SystemRoot%\System32\shell32.dll,21"
$shortcut.Save()
Write-Host "Created: ProxyMonitor.lnk" -ForegroundColor Green

# Create view report shortcut
$shortcutPath2 = Join-Path $desktopPath "ViewProxyReport.lnk"
$shortcut2 = $WshShell.CreateShortcut($shortcutPath2)
$shortcut2.TargetPath = Join-Path $scriptPath "view-report.bat"
$shortcut2.WorkingDirectory = $scriptPath
$shortcut2.Description = "View Proxy Monitor Network Report"
$shortcut2.IconLocation = "%SystemRoot%\System32\shell32.dll,134"
$shortcut2.Save()
Write-Host "Created: ViewProxyReport.lnk" -ForegroundColor Green

Write-Host ""
Write-Host "Desktop shortcuts created successfully!" -ForegroundColor Green