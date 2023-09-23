export function comma(number: number) {
  return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
