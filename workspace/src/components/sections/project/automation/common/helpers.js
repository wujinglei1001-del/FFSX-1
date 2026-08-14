export const getUnusedOptions = (all, used, excludeIndex, getValue = (item) => item) => {
  const usedValues =
    excludeIndex !== undefined ? used.filter((_, index) => index !== excludeIndex) : used;

  return all.filter((option) => !usedValues.includes(getValue(option)));
};
