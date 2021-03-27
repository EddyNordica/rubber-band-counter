import type { IStorage } from './IStorage';
import { InMemoryStorage } from './InMemoryStorage';

export const getLocalStorage = (): IStorage => {
  try {
    return window.localStorage;
  } catch (e) {
    return new InMemoryStorage();
  }
};
