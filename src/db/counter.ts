import { createAppStore } from './createAppStore';
import { isPositiveInteger } from '../app/validations';

export const MaxCount = Number.MAX_SAFE_INTEGER;
export const isValidCount = (includeZero?: boolean) =>
  isPositiveInteger(includeZero ?? true).max(MaxCount, '数が大きすぎます。');
export const canIncrease = (count: number): boolean => count < MaxCount;
export const canDecrease = (count: number): boolean => count > 0;

const validateCount = (value: number): value is number => {
  const schema = isValidCount();
  return schema.isValidSync(value);
};

const createCounter = () => {
  const DefaultCount = 0;
  const { subscribe, set, update, reset } = createAppStore('storedCount', {
    defaultValue: DefaultCount,
    parser: (value: string) => parseInt(value),
    serializer: (value: number) => `${value}`,
    validator: validateCount,
  });

  return {
    subscribe,
    set,
    reset,
    addCount: (amount: number) =>
      update((c) => {
        const newCount = c + amount;
        return validateCount(newCount) ? newCount : MaxCount;
      }),
    removeCount: (amount: number) =>
      update((c) => {
        const newCount = c - amount;
        return validateCount(newCount) ? newCount : DefaultCount;
      }),
  };
};

export const counter = createCounter();
