export const THEME_TO_CH_COLOR = {
  primary: 'chBlue',
  warning: 'chOrange',
  error: 'chRed',
  success: 'chGreen',
  info: 'chPurple',
};

export const defaultLabelOptions = [
  { label: 'Admin', chColor: 'chBlue', themeColor: 'primary', checked: true },
  { label: 'Modification', chColor: 'chOrange', themeColor: 'warning', checked: true },
  { label: 'Bug', chColor: 'chRed', themeColor: 'error', checked: true },
  { label: 'Solvable', chColor: 'chGreen', themeColor: 'success', checked: false },
];

export const taskLabelToOption = (taskLabel) => ({
  label: taskLabel.label,
  chColor: THEME_TO_CH_COLOR[taskLabel.color],
  themeColor: taskLabel.color,
});

export const optionToTaskLabel = (labelOption) => ({
  label: labelOption.label,
  color: labelOption.themeColor,
});

export const mergeAvailableLabelOptions = (existingOptions, taskLabels) => {
  const optionByLabel = new Map(existingOptions.map((option) => [option.label, option]));

  taskLabels.forEach((taskLabel) => {
    if (!optionByLabel.has(taskLabel.label)) {
      optionByLabel.set(taskLabel.label, taskLabelToOption(taskLabel));
    }
  });

  return Array.from(optionByLabel.values());
};
