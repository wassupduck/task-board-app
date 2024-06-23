export function columnIndicatorColor(uuid: string) {
  const p = uuid.split("-");
  const h = parseInt(p[0], 16) / 4294967295;
  const s = parseInt(p[1], 16) / 65535;
  const l = parseInt(p[2], 16) / 65535;

  const hue = 360 * h;
  const saturation = 70 + 30 * s;
  const lightness = 70 + 10 * l;

  return `hsl(${hue}, ${saturation}%, ${lightness}%`;
}
