export const isInteger = (value: any): boolean =>
  !isNaN(value) && Number.isInteger(value);
