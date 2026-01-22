经过测试，我发现之前的方案中通过标准输入 (stdin) 传递 PowerShell 脚本的方式在当前 Windows 环境下执行失败，导致无法获取流量数据。
我已经验证了使用 Base64 编码命令 (`-EncodedCommand`) 的方式可以成功获取到进程的 I/O 流量数据。

### 修复方案

我将修改 `network-monitor-service.ts` 文件，采用更稳健的 PowerShell 执行方式：

1.  **修改 `getWindowsTrafficStats` 方法**：
    *   将 PowerShell 脚本字符串转换为 UTF-16LE 编码的 Buffer。
    *   将 Buffer 转为 Base64 字符串。
    *   使用 `execa` 调用 PowerShell 时，通过 `-EncodedCommand` 参数传递脚本，替代之前的 `-Command -` 和 `input` 方式。

这种方式可以避免命令行字符转义、stdin 管道中断等常见问题，确保脚本在各种 Windows 环境下都能正确执行。

### 预期结果
修改后，PowerShell 脚本将能正确返回 JSON 数据，应用将能成功解析并显示进程的实时上传/下载速率（基于 I/O 估算）。
