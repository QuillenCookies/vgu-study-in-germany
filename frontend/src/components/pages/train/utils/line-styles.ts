// Shared utility: map a line name to Tailwind bg/border classes
export function getLineStyles(line: string): string {
  if (line.startsWith('S')) return 'bg-[#008d3f] border-[#006b30]';
  if (line.startsWith('U')) return 'bg-[#003090] border-[#002060]';
  if (line.match(/^(RE|RB|SE)/)) return 'bg-[#be0000] border-[#8b0000]';
  if (line.startsWith('ICE') || line.startsWith('IC'))
    return 'bg-[#ececec] text-[#ff0000] border-[#cccccc]';
  if (line.startsWith('STR') || line.startsWith('T'))
    return 'bg-[#c0392b] border-[#922b21]';
  if (line.startsWith('Bus') || /^[0-9]/.test(line))
    return 'bg-[#6d3fc8] border-[#4a2a8a]';
  return 'bg-[#333333] border-black';
}

/** Returns a hex color string for UI accents (charts, dots, etc.) */
export function getLineColor(line: string): string {
  if (line.startsWith('S')) return '#008d3f';
  if (line.startsWith('U')) return '#003090';
  if (line.match(/^(RE|RB|SE)/)) return '#be0000';
  if (line.startsWith('ICE') || line.startsWith('IC')) return '#cccccc';
  if (line.startsWith('STR') || line.startsWith('T')) return '#c0392b';
  if (line.startsWith('Bus') || /^[0-9]/.test(line)) return '#6d3fc8';
  return '#333333';
}
