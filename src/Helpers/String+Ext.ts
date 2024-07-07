export default function truncateMiddle(str: string, maxLength: number) {
  if (str.length <= maxLength) {
    return str;
  }

  const midpoint = Math.floor(maxLength / 2) - 1;
  const start = str.substring(0, midpoint);
  const end = str.substring(str.length - midpoint);

  return `${start}...${end}`;
}
