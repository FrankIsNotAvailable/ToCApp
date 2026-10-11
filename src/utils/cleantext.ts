export function cleanText(input: string): string {
  return input.replace(/<[A-Z_]+>(.*?)<\/[A-Z_]+>/g, '$1');
}