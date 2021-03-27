import * as yup from 'yup';

export const isInteger = () =>
  yup
    .number()
    .typeError('半角数字で入力してください。')
    .integer('整数で入力してください。');
