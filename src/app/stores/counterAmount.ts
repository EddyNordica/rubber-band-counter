import { createStore } from './createStore';
import { isInteger } from '../../lib/number';

const createCounterAmount = () => {
  const { subscribe, set } = createStore('counterAmount', {
    defaultValue: 1,
    parser: (value: string) => parseInt(value),
    validator: (value: number) => isInteger(value) && value >= 1,
  });

  return {
    subscribe,
    set,
  };
};

export const counterAmount = createCounterAmount();
