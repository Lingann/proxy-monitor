@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ========================================
echo   Proxy Monitor - Network Analyzer
echo ========================================
echo.
echo Starting analysis tool...
echo.

powershell -ExecutionPolicy Bypass -File ".\AnalyzeConnections.ps1"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Generating report...
    echo.
    powershell -ExecutionPolicy Bypass -File ".\GenerateReport.ps1"
) else (
    echo.
    echo Error occurred during analysis!
    echo.
    pause
)