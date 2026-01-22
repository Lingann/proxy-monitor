我将通过以下方案解决 Windows 下无法获取单进程网络流量的问题：

### 核心方案：使用 WMI 获取进程 I/O 数据作为近似值
由于 Windows 系统的限制，无法直接获取精确的单进程网络带宽。我将使用 PowerShell 查询 WMI (`Win32_PerfFormattedData_PerfProc_Process`) 来获取每个进程的 **I/O 读写速度**。
对于网络密集型应用（如浏览器、代理工具），I/O 读写速度与网络上传/下载速度高度相关。为了提高准确性，我将**仅对当前拥有活跃网络连接的进程**应用这些数据。

### 具体实施步骤

1.  **创建 PowerShell 辅助脚本** (`src/modules/network-monitor/get-traffic-helper.ps1`):
    *   编写脚本查询 `Win32_PerfFormattedData_PerfProc_Process`。
    *   获取 `IDProcess` (PID), `IOReadBytesPerSec` (近似下载), `IOWriteBytesPerSec` (近似上传)。
    *   以 JSON 格式输出结果。

2.  **修改 `NetworkMonitor` 服务** (`src/modules/network-monitor/network-monitor-service.ts`):
    *   引入 `execa` 库。
    *   在 `analyze()` 方法中，增加一步：调用上述 PowerShell 脚本。
    *   **数据合并逻辑**：
        *   遍历之前获取到的进程列表。
        *   如果该进程 **拥有网络连接** (`totalConnections > 0`)，则将 PowerShell 返回的 `IORead` 赋值给 `downloadSpeed`，`IOWrite` 赋值给 `uploadSpeed`。
        *   如果进程没有网络连接，保持为 0（避免将纯本地文件操作误判为网络流量）。

3.  **前端优化** (`src/renderer/templates/pages/monitor/monitor.ts`):
    *   无需大幅修改，现有的表格列会自动显示新的非零数据。
    *   (可选) 可以在表格列头添加一个小的 Tooltip 说明 "Windows 下为 I/O 估算值"。

### 预期效果
*   表格中的 **下载** 和 **上传** 列将不再显示 0，而是显示实时的 I/O 速率。
*   虽然是近似值，但能准确反映哪些进程正在进行大量数据传输。
*   解决了用户“始终都是 0”的痛点。
