export const isValidInteger = (value: number): value is number => {
  return !isNaN(value) && Number.isInteger(value) &&
  value >= 0 && value < Number.MAX_SAFE_INTEGER;
};
