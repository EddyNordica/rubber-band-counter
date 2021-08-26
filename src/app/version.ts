import { getLocalStorage } from '../lib/Storage/browserStorage';

const AppVersionKey = 'version';
export const CurrentVersion = '1.1.2';

export const getVersion = (): string => {
  const storage = getLocalStorage();
  return storage.getItem(AppVersionKey) ?? CurrentVersion;
};

export const setVersion = (version: string) => {
  const storage = getLocalStorage();
  storage.setItem(AppVersionKey, version);
};
