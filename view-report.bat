@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ========================================
echo   Proxy Monitor - Network Report
echo ========================================
echo.

if exist "ProxyMonitorReport.html" (
    echo Opening report...
    start "" "ProxyMonitorReport.html"
) else (
    echo Report file not found!
    echo.
    echo Please run "start.bat" to perform analysis first.
    echo.
    pause
)