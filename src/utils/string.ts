export function getPid(prefix: string, id?: number) {
  return prefix + ("000" + id).slice(-4);
}
