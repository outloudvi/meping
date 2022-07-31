export default function parseArgs(s: string): string[] {
  return s
    .trim()
    .split(' ')
    .filter((x) => x)
}
