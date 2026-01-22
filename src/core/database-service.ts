import Database from 'better-sqlite3';
import { app } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { ConfigManager } from './config-manager';

export class DatabaseService {
  private static instance: DatabaseService;
  private db: Database.Database | null = null;

  private constructor() {
    this.initDatabase();
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  private initDatabase(): void {
    const config = ConfigManager.getInstance().getConfig();
    const dbName = config.database.filename;
    // In some contexts (e.g. renderer), app might not be available directly or getPath might fail if not IPC.
    // But since this is core service likely used in Main process, it should be fine.
    // If used in Renderer, we might need IPC or remote.
    // Assuming this is Main process service for now.
    const userDataPath = app.getPath('userData');
    const dbPath = path.join(userDataPath, dbName);

    // Ensure directory exists
    const dbDir = path.dirname(dbPath);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    console.log(`Initializing database at ${dbPath}`);

    try {
      this.db = new Database(dbPath);
      console.log('Connected to database');
      this.createTables();
    } catch (err) {
      console.error('Could not connect to database', err);
    }
  }

  private createTables(): void {
    if (!this.db) return;

    // Create default tables if needed
    // For now we just ensure connection is working
    // Example:
    // this.db.prepare(`CREATE TABLE IF NOT EXISTS system_logs (
    //   id INTEGER PRIMARY KEY AUTOINCREMENT,
    //   timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    //   message TEXT
    // )`).run();
  }

  public getDatabase(): Database.Database | null {
    return this.db;
  }
  
  public close(): void {
      if (this.db) {
          try {
              this.db.close();
              console.log('Database connection closed');
          } catch (err) {
              console.error('Error closing database', err);
          }
          this.db = null;
      }
  }
}
