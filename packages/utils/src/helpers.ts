
export function toJSON(obj: Record<string, any>) {
  return JSON.stringify(obj, null, 2)
}
