import { getLocalStorage } from '../../lib/Storage/browserStorage';
import type { IStorage } from '../../lib/Storage/IStorage';
import type { AppStorageStoreConfig, AppStorageStore } from './AppStorageStore';

export class LocalStorageStore<T> implements AppStorageStore<T> {
  protected readonly storage: IStorage;

  constructor(
    protected readonly key: string,
    private readonly config: Readonly<AppStorageStoreConfig<T>>
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
