export function getRandomNumberInBetween(
  min: number,
  max: number = Infinity
): number {
  return Math.random() * (max - min) + min;
}

export function getRandomValue<T>(list: readonly T[]): T {
  const randomPosition = Math.floor(getRandomNumberInBetween(0, list.length));

  return list[randomPosition];
}
