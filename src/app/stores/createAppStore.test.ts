import type { IStorage } from '../../lib/Storage/IStorage';
import { AppStorageStoreConfig } from './StorageStores/AppStorageStore';
import { LocalStorageStore } from './StorageStores/LocalStorageStore';

class ExposedLocalStorageStore<T> extends LocalStorageStore<T> {
  public get exposedStorage(): IStorage {
    return this.storage;
  }
}

const StorageKey = 'test-store';
const DefaultLocalStorageStoreConfig: AppStorageStoreConfig<number> = {
  defaultValue: 100,
  parser: (value: string): number => parseInt(value) * 10,
  serializer: (value: number): string => `Written Value: ${value}`,
  validator: (value: number) => value > 10,
};

describe('Read', () => {
  test('Returns default value if empty', () => {
    const storage = new ExposedLocalStorageStore(
      StorageKey,
      DefaultLocalStorageStoreConfig
    );

    expect(storage.read()).toBe(DefaultLocalStorageStoreConfig.defaultValue);
  });

  test('Parser is used if the value is not empty', () => {
    const storage = new ExposedLocalStorageStore(
      StorageKey,
      DefaultLocalStorageStoreConfig
    );

    const value = 12345;
    storage.exposedStorage.setItem(StorageKey, `${value}`);

    expect(storage.read()).toBe(
      DefaultLocalStorageStoreConfig.parser(`${value}`)
    );
  });

  test('If the value is invalid, then the default value is read', () => {
    const storage = new ExposedLocalStorageStore(
      StorageKey,
      DefaultLocalStorageStoreConfig
    );

    const value = 1;
    storage.exposedStorage.setItem(StorageKey, `${value}`);

    expect(storage.read()).toBe(DefaultLocalStorageStoreConfig.defaultValue);
  });

  test('Serializer is used for writing value', () => {
    const storage = new ExposedLocalStorageStore(
      StorageKey,
      DefaultLocalStorageStoreConfig
    );

    const value = 123;
    storage.write(value);

    expect(storage.exposedStorage.getItem(StorageKey)).toBe(
      DefaultLocalStorageStoreConfig.serializer?.(value)
    );
  });
});
