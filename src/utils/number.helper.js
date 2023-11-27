export const formatNumber = (value) => {
  if (!value) return 0;

  return String(Number(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
