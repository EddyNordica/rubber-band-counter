import { createAppStore } from './createAppStore';
import { DefaultAppSettings } from '../app/consts/DefaultAppSettings';

const createCounterUnit = () => {
  const { subscribe, set, reset } = createAppStore('counterUnit', {
    defaultValue: DefaultAppSettings.counterUnit,
    parser: (value: string) => value,
  });

  return {
    subscribe,
    set,
    reset,
  };
};

export const counterUnit = createCounterUnit();
