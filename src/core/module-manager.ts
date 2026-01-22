export interface Module {
  id: string;
  nameKey: string;
  icon: string;
  viewPath: string;
}

export class ModuleManager {
  private static instance: ModuleManager;
  private modules: Module[] = [];

  private constructor() {}

  public static getInstance(): ModuleManager {
    if (!ModuleManager.instance) {
      ModuleManager.instance = new ModuleManager();
    }
    return ModuleManager.instance;
  }

  public register(module: Module): void {
    this.modules.push(module);
  }

  public getModules(): Module[] {
    return this.modules;
  }
}
