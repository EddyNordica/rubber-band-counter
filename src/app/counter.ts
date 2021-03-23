import { writable } from 'svelte/store';
import { getLocalStorage } from '../lib/BrowserStorage/browserStorage';

const StoredCountKey = 'storedCount';

export const MaxCount = Number.MAX_SAFE_INTEGER;

export const isValidCount = (value: number): value is number => {
  return !isNaN(value) && Number.isInteger(value) &&
  value >= 0 && value <= MaxCount;
};

const getCount = (): number => {
  const storage = getLocalStorage();
  const storedCount = storage.getItem(StoredCountKey);

  if (storedCount == null) {
    return 0;
  } else {
    const parsed = parseInt(storedCount);
    return isValidCount(parsed) ? parsed : 0;
  }
};

export const setCount = (newCount: number): void => {
  count.set(newCount);

  const storage = getLocalStorage();
  storage.setItem(StoredCountKey, `${newCount}`);
};

export const count = writable(getCount());
