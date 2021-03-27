import { pickAnimation, shouldAnimate } from './animation';

describe('pickAnimation', () => {
  test('100', () => {
    expect(pickAnimation(100)).toContain('rubberBand');
  });

  test('200', () => {
    expect(pickAnimation(200)).toContain('rubberBand');
  });

  test('1000', () => {
    expect(pickAnimation(1000)).toContain('tada');
  });

  test('1100', () => {
    expect(pickAnimation(1100)).toContain('rubberBand');
  });

  test('2000', () => {
    expect(pickAnimation(2000)).toContain('tada');
  });

  test('60000', () => {
    expect(pickAnimation(60000)).toContain('tada');
  });

  test('61000', () => {
    expect(pickAnimation(61000)).toContain('rubberBand');
  });
});

describe('shouldAnimate', () => {
  test('100', () => {
    expect(shouldAnimate(100)).toBe(true);
  });

  test('110', () => {
    expect(shouldAnimate(110)).toBe(false);
  });
  
  test('101', () => {
    expect(shouldAnimate(101)).toBe(false);
  });
  
  test('99', () => {
    expect(shouldAnimate(99)).toBe(false);
  });
  
  test('80', () => {
    expect(shouldAnimate(80)).toBe(false);
  });
  
  test('1', () => {
    expect(shouldAnimate(1)).toBe(false);
  });
  
  test('0', () => {
    expect(shouldAnimate(0)).toBe(false);
  });
  
  test('800', () => {
    expect(shouldAnimate(800)).toBe(true);
  });
  
  test('1000', () => {
    expect(shouldAnimate(1000)).toBe(true);
  });
  
  test('1100', () => {
    expect(shouldAnimate(1100)).toBe(true);
  });

  test('1200', () => {
    expect(shouldAnimate(1200)).toBe(true);
  });
  
  test('11000', () => {
    expect(shouldAnimate(11000)).toBe(true);
  });
  
  test('10100', () => {
    expect(shouldAnimate(10100)).toBe(false);
  });
  
  test('1000000', () => {
    expect(shouldAnimate(1000000)).toBe(true);
  });
  
  test('1100000', () => {
    expect(shouldAnimate(1100000)).toBe(true);
  });
  
  test('1010000', () => {
    expect(shouldAnimate(1010000)).toBe(false);
  });
  
});