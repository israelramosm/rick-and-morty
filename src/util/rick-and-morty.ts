export function getIdFromResourceUrl(url: string): string {
  return url.split("/").filter(Boolean).at(-1) ?? "";
}
