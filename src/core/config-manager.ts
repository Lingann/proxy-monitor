import { app } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

export interface AppConfig {
  locale: string;
  theme: 'light' | 'dark';
  processFilters: string[];
}

const DEFAULT_CONFIG: AppConfig = {
  locale: 'en',
  theme: 'light',
  processFilters: ['GameView', 'GameViewer', 'proxy']
};

export class ConfigManager {
  private static instance: ConfigManager;
  private configPath: string;
  private config: AppConfig;

  private constructor() {
    this.configPath = path.join(app.getPath('userData'), 'config.json');
    this.config = this.loadConfig();
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  private loadConfig(): AppConfig {
    try {
      /* 如果配置文件不存在，直接返回默认配置 */
      if (!fs.existsSync(this.configPath)) {
        return DEFAULT_CONFIG;
      }
      
      const data = fs.readFileSync(this.configPath, 'utf-8');
      return { ...DEFAULT_CONFIG, ...JSON.parse(data) };
    } catch (e) {
      console.error('Failed to load config', e);
      return DEFAULT_CONFIG;
    }
  }

  public getConfig(): AppConfig {
    return this.config;
  }

  public setConfig(newConfig: Partial<AppConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.saveConfig();
  }

  private saveConfig(): void {
    try {
      fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2));
    } catch (e) {
      console.error('Failed to save config', e);
    }
  }
}
