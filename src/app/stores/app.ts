import { createStore } from './createStore';

const createCounterName = () => {
  const { subscribe, set } = createStore('counterName', {
    defaultValue: '輪ゴム',
    parser: (value: string) => value,
  });

  return {
    subscribe,
    set,
  };
};

export const counterName = createCounterName();

const createCounterUnit = () => {
  const { subscribe, set } = createStore('counterUnit', {
    defaultValue: '本',
    parser: (value: string) => value,
  });

  return {
    subscribe,
    set,
  };
};

export const counterUnit = createCounterUnit();
