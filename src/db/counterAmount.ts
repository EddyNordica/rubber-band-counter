import { createAppStore } from './createAppStore';
import { isValidCount } from './counter';
import { DefaultAppSettings } from '../app/consts/DefaultAppSettings';

const validateCount = (value: number): value is number => {
  const schema = isValidCount();
  return schema.isValidSync(value);
};

const createCounterAmount = () => {
  const { subscribe, set, reset } = createAppStore('counterAmount', {
    defaultValue: DefaultAppSettings.counterAmount,
    parser: (value: string) => parseInt(value),
    validator: validateCount,
  });

  return {
    subscribe,
    set,
    reset,
  };
};

export const counterAmount = createCounterAmount();
