
export function getPropValue(obj: unknown, path: string): unknown {
  if (!obj || !path) return undefined

  const paths = path.split('.')
  let current: unknown = obj

  for (const p of paths) {
    if (current === null || current === undefined) return undefined

    if (typeof current !== 'object') return undefined

    const record = current as Record<string, unknown>

    current = record[p]
  }

  return current
}
