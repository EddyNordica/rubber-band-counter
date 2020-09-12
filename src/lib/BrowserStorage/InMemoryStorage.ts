import type { IBrowserStorage } from './IBrowserStorage';

export class InMemoryStorage implements IBrowserStorage {
  private readonly data: Record<string, string>;

  constructor() {
    this.data = {};
  }

  public getItem(key: string): string | null {
    return this.data[key];
  }

  public setItem(key: string, value: string): void {
    this.data[key] = value;
  }

  public removeItem(key: string): void {
    delete this.data[key];
  }
}
