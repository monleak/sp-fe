/**
 * display a number with 4 digits
 */
export function getPid(prefix: string, id?: number) {
  return prefix + ("000" + id).slice(-4);
}
