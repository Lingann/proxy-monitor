
export function getPropValue(obj: any, path: string): any {
  if (!obj || !path) return undefined;
  const paths = path.split('.');
  let current = obj;
  for (const p of paths) {
    if (current === null || current === undefined) return undefined;
    current = current[p];
  }
  return current;
}
