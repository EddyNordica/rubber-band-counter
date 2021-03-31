import * as yup from 'yup';

export const isPositiveInteger = (includeZero?: boolean) => {
  return yup
    .number()
    .typeError('半角数字で入力してください。')
    .integer('整数で入力してください。')
    .min(
      includeZero ? 0 : 1,
      (params) => `${params.min}以上の値を入力してください。`
    );
};
