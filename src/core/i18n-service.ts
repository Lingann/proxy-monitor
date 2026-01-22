import * as fs from 'fs';
import * as path from 'path';
import { app } from 'electron';

export class I18nService {
  private static instance: I18nService;
  private locale: string = 'zh';
  private translations: Record<string, any> = {};

  private constructor() {}

  public static getInstance(): I18nService {
    if (!I18nService.instance) {
      I18nService.instance = new I18nService();
    }
    return I18nService.instance;
  }

  public setLocale(locale: string): void {
    this.locale = locale;
    this.loadTranslations();
  }

  private loadTranslations(): void {
    /* 尝试从 dist 目录加载 */
    let localePath = path.join(app.getAppPath(), 'dist', 'locales', `${this.locale}.json`);
    
    /* 如果 dist 目录不存在，尝试从 src 目录加载 */
    if (!fs.existsSync(localePath)) {
        localePath = path.join(app.getAppPath(), 'src', 'locales', `${this.locale}.json`);
    }

    /* 如果文件仍不存在，清空翻译并返回 */
    if (!fs.existsSync(localePath)) {
      console.warn(`Locale file not found: ${localePath}`);
      this.translations = {};
      return;
    }

    try {
      this.translations = JSON.parse(fs.readFileSync(localePath, 'utf-8'));
    } catch (e) {
      console.error('Failed to load translations', e);
      this.translations = {};
    }
  }

  public t(key: string): string {
    const keys = key.split('.');
    let value = this.translations;
    
    for (const k of keys) {
      /* 如果值为空或未定义，提前中断 */
      if (value === undefined || value === null) break;
      value = value[k];
    }
    
    if (typeof value === 'string') {
        return value;
    }
    return key;
  }

  public getTranslations(): Record<string, any> {
    return this.translations;
  }

  public getLocale(): string {
      return this.locale;
  }
}
