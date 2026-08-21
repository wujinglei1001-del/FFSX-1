import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Container, Dialog, DialogContent } from '@mui/material';
import TaskDetails from 'pages/apps/project/TaskDetails';
import { useAuth } from 'providers/AuthProvider';
import paths from 'routes/paths';
import ProjectGrid from 'components/sections/project/project-list/ProjectGrid';
import ProjectListHeader from 'components/sections/project/project-list/ProjectListHeader';
import ProjectListTable from 'components/sections/project/project-list/ProjectListTable';

const ProjectList = () => {
  const { t: translateUi } = useTranslation();
  const { sessionUser } = useAuth();
  const navigate = useNavigate();
  const [viewType, setViewType] = useState('list');
  const [selectedFilter, setSelectedFilter] = useState('Running');
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);

  return (
    <Container maxWidth="lg">
      <ProjectListHeader
        workspaceName={
          sessionUser?.organizationName || translateUi('ffax.project.workspace_name_fallback')
        }
        workspaceDescription={translateUi('ffax.project.workspace_description')}
        onAddProject={() => navigate(paths.createProject)}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        onViewTypeChange={setViewType}
        viewType={viewType}
        inviteButtonIcon="material-symbols:outgoing-mail-outline"
      />
      {viewType === 'grid' ? (
        <ProjectGrid
          onItemClick={() => {
            setTaskDialogOpen(true);
          }}
        />
      ) : (
        <ProjectListTable
          onItemClick={() => {
            setTaskDialogOpen(true);
          }}
        />
      )}
      <Dialog
        open={taskDialogOpen}
        onClose={() => setTaskDialogOpen(false)}
        fullWidth
        maxWidth={false}
        scroll="paper"
        slotProps={{
          paper: {
            sx: {
              width: '100%',
              maxWidth: { xs: '100%', sm: 552, md: 820, lg: 1120 },
              maxHeight: '80vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              borderRadius: 2,
              mx: 2,
            },
          },
        }}
      >
        <DialogContent
          sx={{
            p: 0,
            flex: 1,
            minHeight: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <TaskDetails onClose={() => setTaskDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ProjectList;
