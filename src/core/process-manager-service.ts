import { fork, ChildProcess } from 'child_process';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface ProcessOptions {
  args?: string[];
  env?: NodeJS.ProcessEnv;
  cwd?: string;
}

export class ProcessManagerService {
  private static instance: ProcessManagerService;
  private processes: Map<string, ChildProcess> = new Map();
  private messageHandlers: Map<string, (message: any) => void> = new Map();

  private constructor() {
    // Clean up processes on exit
    const cleanup = () => {
      this.stopAll();
    };
    
    process.on('exit', cleanup);
    process.on('SIGINT', () => {
        cleanup();
        process.exit();
    });
    process.on('SIGTERM', () => {
        cleanup();
        process.exit();
    });
  }

  public static getInstance(): ProcessManagerService {
    if (!ProcessManagerService.instance) {
      ProcessManagerService.instance = new ProcessManagerService();
    }
    return ProcessManagerService.instance;
  }

  /**
   * Start a new child process
   * @param id Unique identifier for the process
   * @param modulePath Path to the module to run (absolute path)
   * @param options Process options
   */
  public startProcess(id: string, modulePath: string, options: ProcessOptions = {}): void {
    if (this.processes.has(id)) {
      console.warn(`Process with ID ${id} is already running.`);
      return;
    }

    console.log(`Starting process ${id} from ${modulePath}`);

    // Check if we need to adjust path for .ts vs .js
    // Since we are running in electron (likely dist), modulePath should point to .js
    // If we are in dev (ts-node), we might need .ts, but fork usually requires js or registration.
    // In this project, main process is compiled to dist. 
    // We assume modulePath is correct or we fix it if needed.
    
    try {
      const child = fork(modulePath, options.args || [], {
        env: { ...process.env, ...options.env },
        cwd: options.cwd || process.cwd(),
        stdio: ['inherit', 'inherit', 'inherit', 'ipc']
      });

      child.on('message', (message) => {
        const handler = this.messageHandlers.get(id);
        if (handler) {
          handler(message);
        }
      });

      child.on('error', (err) => {
        console.error(`Process ${id} error:`, err);
      });

      child.on('exit', (code, signal) => {
        console.log(`Process ${id} exited with code ${code} and signal ${signal}`);
        this.processes.delete(id);
      });

      this.processes.set(id, child);
    } catch (error) {
      console.error(`Failed to start process ${id}:`, error);
      throw error;
    }
  }

  /**
   * Stop a running process
   * @param id Process ID
   */
  public stopProcess(id: string): void {
    const child = this.processes.get(id);
    if (child) {
      console.log(`Stopping process ${id}`);
      child.kill();
      this.processes.delete(id);
    }
  }

  /**
   * Stop all managed processes
   */
  public stopAll(): void {
    for (const id of this.processes.keys()) {
      this.stopProcess(id);
    }
  }

  /**
   * Send a message to a process
   * @param id Process ID
   * @param message Message payload
   */
  public sendMessage(id: string, message: any): void {
    const child = this.processes.get(id);
    if (child && child.connected) {
      child.send(message);
    } else {
      console.warn(`Cannot send message to process ${id}: not running or disconnected`);
    }
  }

  /**
   * Register a message handler for a process
   * @param id Process ID
   * @param handler Callback function
   */
  public onMessage(id: string, handler: (message: any) => void): void {
    this.messageHandlers.set(id, handler);
  }

  /**
   * Remove message handler
   */
  public offMessage(id: string): void {
    this.messageHandlers.delete(id);
  }

  public isRunning(id: string): boolean {
      return this.processes.has(id);
  }
}
