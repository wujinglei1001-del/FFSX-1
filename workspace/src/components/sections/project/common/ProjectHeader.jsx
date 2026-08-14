import { useState } from 'react';
import { Box } from '@mui/material';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import PageHeader from 'components/sections/ecommerce/admin/common/PageHeader';
import ProjectHeaderTitleSection from './ProjectHeaderTitleSection';
import ProjectHeaderToolbar from './ProjectHeaderToolbar';
import TaskDialog from './TaskDialog';
import { desktopTitleRowSx, projectHeaderPaperSx, topActionsSlotSx } from './projectHeaderStyles';

const ProjectHeader = ({
  title,
  subtitle,
  breadcrumb = [],
  onTaskSubmit,
  showTaskDialog = true,
  taskDialogOpen: controlledTaskDialogOpen,
  onTaskDialogOpenChange,
  taskDialogMode = 'create',
  taskDialogInitialValues,
  topActions,
  toolbar,
}) => {
  const { down } = useBreakpoints();
  const downMd = down('md');

  const [internalTaskDialogOpen, setInternalTaskDialogOpen] = useState(false);

  const taskDialogOpen =
    controlledTaskDialogOpen !== undefined ? controlledTaskDialogOpen : internalTaskDialogOpen;

  const setTaskDialogOpen = (open) => {
    if (onTaskDialogOpenChange) {
      onTaskDialogOpenChange(open);
    } else {
      setInternalTaskDialogOpen(open);
    }
  };

  const hasSubtitle = subtitle != null && subtitle !== '';
  const downSm = down('sm');
  const stackedToolbar = downMd && (hasSubtitle || downSm);
  const hasToolbar = toolbar?.left != null || toolbar?.right != null;

  const toolbarComponent = hasToolbar ? (
    <ProjectHeaderToolbar left={toolbar?.left} right={toolbar?.right} stacked={stackedToolbar} />
  ) : undefined;

  const taskDialog = showTaskDialog ? (
    <TaskDialog
      open={taskDialogOpen}
      onClose={() => setTaskDialogOpen(false)}
      onSubmit={onTaskSubmit}
      mode={taskDialogMode}
      initialValues={taskDialogInitialValues}
    />
  ) : null;

  if (downMd) {
    return (
      <>
        <PageHeader
          titleSectionComponent={
            <ProjectHeaderTitleSection
              title={title}
              subtitle={subtitle}
              breadcrumb={breadcrumb}
              topActions={topActions}
            />
          }
          footerComponent={toolbarComponent}
          paperProps={{ sx: projectHeaderPaperSx }}
        />
        {taskDialog}
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={title}
        breadcrumb={breadcrumb}
        description={subtitle}
        sx={desktopTitleRowSx}
        actionComponent={
          topActions != null ? <Box sx={topActionsSlotSx}>{topActions}</Box> : undefined
        }
        footerComponent={toolbarComponent}
        paperProps={{ sx: projectHeaderPaperSx }}
      />
      {taskDialog}
    </>
  );
};

export default ProjectHeader;
