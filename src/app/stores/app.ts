import { createStore } from './createStore';
import { DefaultAppSettings } from '../consts/DefaultAppSettings';

const createCounterName = () => {
  const { subscribe, set, reset } = createStore('counterName', {
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

const createCounterUnit = () => {
  const { subscribe, set, reset } = createStore('counterUnit', {
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
