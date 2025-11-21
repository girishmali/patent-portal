export function calculateEDD(lmp) {
  const d = new Date(lmp);
  d.setMonth(d.getMonth() + 9);
  d.setDate(d.getDate() + 7);
  return d.toISOString().split("T")[0];
}
