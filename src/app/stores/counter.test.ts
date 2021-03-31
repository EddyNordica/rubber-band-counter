import { get } from 'svelte/store';
import { counter, MaxCount } from './counter';

describe('Add', () => {
  test('Adding valid amount', () => {
    const currentValue = get(counter);
    const addedAmount = 100;
    counter.addCount(addedAmount);

    expect(get(counter)).toBe(currentValue + addedAmount);
  });

  test('Adding invalid amount', () => {
    const addedAmount = 999999999999999999999;
    counter.addCount(addedAmount);

    expect(get(counter)).toBe(MaxCount);
  });
});

describe('Remove', () => {
  test('Removing valid amount', () => {
    const initialValue = 1000;
    counter.set(initialValue);

    const removedAmount = 100;
    counter.removeCount(removedAmount);

    expect(get(counter)).toBe(initialValue - removedAmount);
  });

  test('Removing invalid amount', () => {
    const initialValue = 1000;
    counter.set(initialValue);

    const removedAmount = 99999999999999999;
    counter.removeCount(removedAmount);

    expect(get(counter)).toBe(0);
  });
});
