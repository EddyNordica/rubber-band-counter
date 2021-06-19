export interface AppStorageStoreConfig<T> {
  defaultValue: T;
  parser: (value: string) => T;
  serializer?: (value: T) => string;
  validator?: (value: T) => boolean;
}

export interface AppStorageStore<T> {
  read: () => T;
  write: (value: T) => void;
}
