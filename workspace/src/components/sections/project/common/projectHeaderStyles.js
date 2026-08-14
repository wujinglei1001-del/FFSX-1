export const projectHeaderPaperSx = {
  overflow: 'hidden',
  borderRadius: 0,
};

export const toolbarSlotSx = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 1,
  minWidth: 0,
};

export const inlineToolbarLeftSlotSx = {
  ...toolbarSlotSx,
  flex: '1 1 auto',
  minWidth: 0,
};

export const stackedToolbarLeftSlotSx = {
  ...toolbarSlotSx,
  width: 1,
  minWidth: 0,
};

export const desktopTitleRowSx = {
  flexDirection: { xs: 'column', sm: 'row' },
  alignItems: { xs: 'flex-start', sm: 'flex-end' },
};

export const topActionsSlotSx = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  flexShrink: 0,
  minWidth: 0,
  ml: 'auto',
};

export const inlineToolbarRowSx = {
  gap: 1,
  width: 1,
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'nowrap',
  minWidth: 0,
};

export const inlineToolbarRightSlotSx = {
  ...toolbarSlotSx,
  flexShrink: 0,
  justifyContent: 'flex-end',
  ml: 'auto',
};

export const stackedToolbarRightSlotSx = {
  ...toolbarSlotSx,
  width: 1,
  minWidth: 0,
};
