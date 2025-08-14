function capitalizeFirstLetter(value: string): string {
  return value
    .split(RegExp('\\s+'))
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    .trim();
}

export const stringUtils = {
  capitalizeFirstLetter,
};
