export function sliceText(text: string): string {
  return text.length > 8 ? text.slice(0, 8).toString() + "..." : text;
}
