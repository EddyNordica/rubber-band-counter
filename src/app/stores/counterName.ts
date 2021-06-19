import { createAppStore } from './createAppStore';
import { DefaultAppSettings } from '../consts/DefaultAppSettings';

const createCounterName = () => {
  const { subscribe, set, reset } = createAppStore('counterName', {
    defaultValue: DefaultAppSettings.counterName,
    parser: (value: string) => value,
  });

  return {
    subscribe,
    set,
    reset,
  };
};

export const counterName = createCounterName();
