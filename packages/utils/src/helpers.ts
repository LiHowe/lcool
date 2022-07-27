
export function toJSON(obj: Record<string, unknown>| unknown[]) {
  return JSON.stringify(obj, null, 2)
}
