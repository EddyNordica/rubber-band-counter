import { writable } from 'svelte/store';
import { getLocalStorage } from '../../lib/Storage/browserStorage';
import type { IStorage } from '../../lib/Storage/IStorage';

export interface LocalStorageStoreConfig<T> {
  defaultValue: T;
  parser: (value: string) => T;
  serializer?: (value: T) => string;
  validator?: (value: T) => boolean;
}

export class LocalStorageStore<T> {
  protected readonly storage: IStorage;

  constructor(
    protected readonly key: string,
    private readonly config: Readonly<LocalStorageStoreConfig<T>>
  ) {
    this.storage = getLocalStorage();
  }

  public read(): T {
    const storedItem = this.storage.getItem(this.key);

    if (storedItem == null) {
      return this.config.defaultValue;
    } else {
      const parsed = this.config.parser(storedItem);
      return this.config.validator == null || this.config.validator(parsed)
        ? parsed
        : this.config.defaultValue;
    }
  }

  public write(value: T) {
    this.storage.setItem(
      this.key,
      this.config.serializer?.(value) ?? `${value}`
    );
  }
}

export const createStore = <T>(
  key: string,
  storeConfig: LocalStorageStoreConfig<T>,
  StorageStore?: new (
    key: string,
    config: LocalStorageStoreConfig<T>
  ) => LocalStorageStore<T>
) => {
  const store =
    StorageStore != null
      ? new StorageStore(key, storeConfig)
      : new LocalStorageStore(key, storeConfig);

  const { subscribe, set, update } = writable(store.read(), () => {
    const unsubscribe = subscribe((unit) => {
      store.write(unit);
    });

    return () => {
      unsubscribe();
    };
  });

  return {
    subscribe,
    set,
    update,
    reset: () => set(storeConfig.defaultValue),
  };
};
