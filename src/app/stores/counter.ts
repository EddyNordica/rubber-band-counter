import { createStore } from './createStore';
import { isInteger } from '../../lib/number';

export const MaxCount = Number.MAX_SAFE_INTEGER;
export const isValidCount = (value: number): value is number =>
  isInteger(value) && value >= 0 && value <= MaxCount;
export const canIncrease = (count: number): boolean => count < MaxCount;
export const canDecrease = (count: number): boolean => count > 0;

const createCounter = () => {
  const { subscribe, set, update } = createStore('storedCount', {
    defaultValue: 0,
    parser: (value: string) => parseInt(value),
    serializer: (value: number) => `${value}`,
    validator: isValidCount,
  });

  return {
    subscribe,
    addCount: (amount: number) =>
      update((c) => {
        const newCount = c + amount;
        return isValidCount(newCount) ? newCount : MaxCount;
      }),
    removeCount: (amount: number) =>
      update((c) => {
        const newCount = c - amount;
        return isValidCount(newCount) ? newCount : 0;
      }),
    promptReset: () => {
      if (confirm('カウンターをリセットしますか？')) {
        set(0);
      }
    },
    promptNewCount: () => {
      const newCount = prompt('輪ゴムの数を半角数字で入力してください。');
      if (newCount != null) {
        const parsedCount = parseInt(newCount, 10);
        if (isValidCount(parsedCount)) {
          set(parsedCount);
        } else {
          alert('数が大きすぎるか有効な数字ではありません。');
        }
      }
    },
  };
};

export const counter = createCounter();
