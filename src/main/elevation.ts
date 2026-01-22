import { app } from 'electron';
import { spawn, execSync } from 'child_process';

/**
 * Check if the process has admin privileges (Windows)
 */
export function isAdmin(): boolean {
  if (process.platform !== 'win32') return true;

  try {
    // 'net session' requires admin privileges to run
    execSync('net session', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Ensure the application is running with admin privileges.
 * If not, it attempts to relaunch itself as admin.
 */
export function ensureElevation(): void {
  if (process.platform !== 'win32') return;

  if (isAdmin()) {
    return;
  }

  const script = generatePsScript();
  
  // Spawn a detached PowerShell process to run the elevation command
  const child = spawn('powershell.exe', ["-Command", script], {
    detached: true,
    stdio: 'ignore'
  });

  child.unref(); 
  app.quit();
}

function generatePsScript(): string {
  const executable = process.execPath;
  const args = process.argv.slice(1);
  
  // Wrap arguments in quotes to handle spaces
  const argList = args.map(arg => `"${arg}"`).join(',');

  // Start-Process -Verb RunAs triggers the UAC prompt
  if (argList.length > 0) {
      return `Start-Process -FilePath "${executable}" -ArgumentList ${argList} -Verb RunAs`;
  } else {
      return `Start-Process -FilePath "${executable}" -Verb RunAs`;
  }
}
