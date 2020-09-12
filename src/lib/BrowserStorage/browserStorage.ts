import type { IBrowserStorage } from './IBrowserStorage';
import { InMemoryStorage } from './InMemoryStorage';

export const getLocalStorage = (): IBrowserStorage => {
  try {
    return window.localStorage;
  } catch (e) {
    return new InMemoryStorage();
  }
};
