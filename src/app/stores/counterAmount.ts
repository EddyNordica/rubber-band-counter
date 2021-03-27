import { createStore } from './createStore';
import { isInteger } from '../../lib/number';
import { DefaultAppSettings } from '../consts/DefaultAppSettings';

const createCounterAmount = () => {
  const { subscribe, set, reset } = createStore('counterAmount', {
    defaultValue: DefaultAppSettings.counterAmount,
    parser: (value: string) => parseInt(value),
    validator: (value: number) => isInteger(value) && value >= 1,
  });

  return {
    subscribe,
    set,
    reset,
  };
};

export const counterAmount = createCounterAmount();
