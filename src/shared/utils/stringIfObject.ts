export function stringifyObject(obj: any): string {
  if (obj == null) return "";
  if (
    typeof obj === "string" ||
    typeof obj === "number" ||
    typeof obj === "boolean"
  ) {
    return String(obj);
  }
  if (Array.isArray(obj)) {
    return obj.map(stringifyObject).join(" ");
  }
  if (typeof obj === "object") {
    return Object.values(obj).map(stringifyObject).join(" ");
  }
  return "";
}
