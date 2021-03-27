export enum AnimationName {
  RubberBand = 'rubberBand',
  Tada = 'tada',
}

export const pickAnimation = (count: number): AnimationName => {
  return count >= 1000 && count % Math.pow(10, numDigits(count) - 1) === 0
    ? AnimationName.Tada
    : AnimationName.RubberBand;
};

export const shouldAnimate = (count: number): boolean => {
  if (count === 0) {
    return false;
  }

  const base = Math.max(100, Math.pow(10, numDigits(count) - 2));
  return count % base === 0;
};

const numDigits = (integer: number): number => `${integer}`.length;
