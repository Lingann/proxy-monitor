import { execSync } from 'child_process';
import { SystemProxyConfig, ProxyBypassRule, ExtendedProxyConfig } from '../../shared/common-types.js';

/* 系统代理服务类 */
export class SystemProxyService {
  private static instance: SystemProxyService;

  private constructor() {}

  public static getInstance(): SystemProxyService {
    if (!SystemProxyService.instance) {
      SystemProxyService.instance = new SystemProxyService();
    }

    return SystemProxyService.instance;
  }

  /* 获取当前系统代理配置 */
  public async getProxyConfig(): Promise<SystemProxyConfig> {
    try {
      const regPath = 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings';

      const enabledResult = this.queryRegistry(regPath, 'ProxyEnable');

      const serverResult = this.queryRegistry(regPath, 'ProxyServer');

      const bypassResult = this.queryRegistry(regPath, 'ProxyOverride');

      return {
        enabled: enabledResult === '0x1',
        server: serverResult || '',
        bypass: bypassResult || ''
      };
    } catch (error) {
      console.error('Failed to get proxy config:', error);

      throw new Error('无法读取系统代理设置');
    }
  }

  /* 设置系统代理 */
  public async setProxyConfig(config: Partial<SystemProxyConfig>): Promise<void> {
    try {
      const regPath = 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings';

      if (config.enabled !== undefined) {
        const value = config.enabled ? '1' : '0';

        this.setRegistry(regPath, 'ProxyEnable', 'REG_DWORD', value);
      }

      if (config.server !== undefined) {
        this.setRegistry(regPath, 'ProxyServer', 'REG_SZ', config.server);
      }

      if (config.bypass !== undefined) {
        this.setRegistry(regPath, 'ProxyOverride', 'REG_SZ', config.bypass);
      }

      this.notifyProxyChange();
    } catch (error) {
      console.error('Failed to set proxy config:', error);

      throw new Error('无法设置系统代理');
    }
  }

  /* 启用系统代理 */
  public async enableProxy(): Promise<void> {
    await this.setProxyConfig({ enabled: true });
  }

  /* 禁用系统代理 */
  public async disableProxy(): Promise<void> {
    await this.setProxyConfig({ enabled: false });
  }

  /* 查询注册表值 */
  private queryRegistry(path: string, key: string): string {
    try {
      const command = `reg query "${path}" /v ${key}`;

      const output = execSync(command, { encoding: 'utf-8' });

      const match = output.match(/REG_\w+\s+(.+)/);

      return match ? match[1].trim() : '';
    } catch (error) {
      return '';
    }
  }

  /* 设置注册表值 */
  private setRegistry(path: string, key: string, type: string, value: string): void {
    const command = `reg add "${path}" /v ${key} /t ${type} /d "${value}" /f`;

    execSync(command, { encoding: 'utf-8' });
  }

  /* 通知系统代理设置已更改 */
  private notifyProxyChange(): void {
    const psScript = `
      $signature = @"
      [DllImport("wininet.dll", SetLastError = true, CharSet=CharSet.Auto)]
      public static extern bool InternetSetOption(IntPtr hInternet, int dwOption, IntPtr lpBuffer, int dwBufferLength);
      "@
      $type = Add-Type -MemberDefinition $signature -Name WinINet -Namespace InternetSettings -PassThru
      $type::InternetSetOption([IntPtr]::Zero, 39, [IntPtr]::Zero, 0) | Out-Null
      $type::InternetSetOption([IntPtr]::Zero, 37, [IntPtr]::Zero, 0) | Out-Null
    `;

    try {
      execSync(`powershell -Command "${psScript.replace(/\n/g, ' ')}"`, { encoding: 'utf-8' });
    } catch (error) {
      console.warn('Failed to notify proxy change:', error);
    }
  }

  /* 获取扩展的代理配置（包含规则列表） */
  public async getExtendedProxyConfig(): Promise<ExtendedProxyConfig> {
    const config = await this.getProxyConfig();
    const bypassRules = this.parseBypassString(config.bypass);

    return {
      enabled: config.enabled,
      server: config.server,
      bypassRules
    };
  }

  /* 设置扩展的代理配置 */
  public async setExtendedProxyConfig(config: Partial<ExtendedProxyConfig>): Promise<void> {
    const updateConfig: Partial<SystemProxyConfig> = {};

    if (config.enabled !== undefined) {
      updateConfig.enabled = config.enabled;
    }

    if (config.server !== undefined) {
      updateConfig.server = config.server;
    }

    if (config.bypassRules !== undefined) {
      updateConfig.bypass = this.stringifyBypassRules(config.bypassRules);
    }

    await this.setProxyConfig(updateConfig);
  }

  /* 解析 bypass 字符串为规则列表 */
  private parseBypassString(bypassStr: string): ProxyBypassRule[] {
    if (!bypassStr) return [];

    return bypassStr
      .split(';')
      .filter(addr => addr.trim())
      .map((addr, index) => ({
        id: `rule-${Date.now()}-${index}`,
        address: addr.trim(),
        enabled: true,
        createdAt: Date.now()
      }));
  }

  /* 将规则列表转换为 bypass 字符串 */
  private stringifyBypassRules(rules: ProxyBypassRule[]): string {
    return rules
      .filter(rule => rule.enabled)
      .map(rule => rule.address)
      .join(';');
  }

  /* 添加绕过规则 */
  public async addBypassRule(address: string, description?: string): Promise<void> {
    const config = await this.getExtendedProxyConfig();
    const newRule: ProxyBypassRule = {
      id: `rule-${Date.now()}`,
      address,
      description,
      enabled: true,
      createdAt: Date.now()
    };

    config.bypassRules.push(newRule);
    await this.setExtendedProxyConfig({ bypassRules: config.bypassRules });
  }

  /* 删除绕过规则 */
  public async removeBypassRule(ruleId: string): Promise<void> {
    const config = await this.getExtendedProxyConfig();
    config.bypassRules = config.bypassRules.filter(rule => rule.id !== ruleId);
    await this.setExtendedProxyConfig({ bypassRules: config.bypassRules });
  }

  /* 更新绕过规则 */
  public async updateBypassRule(ruleId: string, updates: Partial<ProxyBypassRule>): Promise<void> {
    const config = await this.getExtendedProxyConfig();
    const ruleIndex = config.bypassRules.findIndex(rule => rule.id === ruleId);

    if (ruleIndex !== -1) {
      config.bypassRules[ruleIndex] = {
        ...config.bypassRules[ruleIndex],
        ...updates
      };
      await this.setExtendedProxyConfig({ bypassRules: config.bypassRules });
    }
  }

  /* 批量添加地址到绕过列表 */
  public async addAddressesToBypass(addresses: string[], description?: string): Promise<void> {
    const config = await this.getExtendedProxyConfig();
    const timestamp = Date.now();

    const newRules: ProxyBypassRule[] = addresses.map((address, index) => ({
      id: `rule-${timestamp}-${index}`,
      address,
      description,
      enabled: true,
      createdAt: timestamp
    }));

    config.bypassRules.push(...newRules);
    await this.setExtendedProxyConfig({ bypassRules: config.bypassRules });
  }
}
