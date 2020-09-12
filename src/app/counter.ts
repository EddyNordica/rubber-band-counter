import { writable } from 'svelte/store';
import { getLocalStorage } from '../lib/BrowserStorage/browserStorage';
import { isValidInteger } from '../utils/number';

const StoredCountKey = 'storedCount';

const getCount = (): number => {
  const storage = getLocalStorage();
  const storedCount = storage.getItem(StoredCountKey);

  if (storedCount == null) {
    return 0;
  } else {
    const parsed = parseInt(storedCount);
    return isValidInteger(parsed) ? parsed : 0;
  }
};

export const setCount = (newCount: number): void => {
  count.set(newCount);

  const storage = getLocalStorage();
  storage.setItem(StoredCountKey, `${newCount}`);
};

export const count = writable(getCount());
