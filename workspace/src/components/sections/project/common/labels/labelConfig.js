import i18n from 'locales/i18n';

export const THEME_TO_CH_COLOR = {
  primary: 'chBlue',
  warning: 'chOrange',
  error: 'chRed',
  success: 'chGreen',
  info: 'chPurple',
};

export const defaultLabelOptions = [
  {
    get label() {
      return i18n.t('ui.sections.project.common.labels.admin_4e7afebc');
    },
    chColor: 'chBlue',
    themeColor: 'primary',
    checked: true,
  },
  {
    get label() {
      return i18n.t('ui.sections.project.common.labels.modification_e3ea079d');
    },
    chColor: 'chOrange',
    themeColor: 'warning',
    checked: true,
  },
  {
    get label() {
      return i18n.t('ui.sections.project.common.labels.bug_271befc0');
    },
    chColor: 'chRed',
    themeColor: 'error',
    checked: true,
  },
  {
    get label() {
      return i18n.t('ui.sections.project.common.labels.solvable_3102f401');
    },
    chColor: 'chGreen',
    themeColor: 'success',
    checked: false,
  },
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
