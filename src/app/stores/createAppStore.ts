import { writable } from 'svelte/store';
import type {
  AppStorageStore,
  AppStorageStoreConfig,
} from './StorageStores/AppStorageStore';
import { LocalStorageStore } from './StorageStores/LocalStorageStore';

/**
 * Creates a store for saving application data.
 */
export const createAppStore = <T>(
  key: string,
  storeConfig: AppStorageStoreConfig<T>,
  StorageStore?: new (
    key: string,
    config: AppStorageStoreConfig<T>
  ) => AppStorageStore<T>
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
