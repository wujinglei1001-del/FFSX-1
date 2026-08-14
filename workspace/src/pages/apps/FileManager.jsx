import { Stack } from '@mui/material';
import FileManagerProvider from 'providers/FileManagerProvider';
import MainContent from 'components/sections/file-manager/main/MainContent';
import FileManagerSidebar from 'components/sections/file-manager/sidebar/FileManagerSidebar';

const FileManager = () => {
  return (
    <FileManagerProvider>
      <Stack
        direction="row"
        sx={{
          height: 1,
        }}
      >
        <FileManagerSidebar />

        <MainContent />
      </Stack>
    </FileManagerProvider>
  );
};

export default FileManager;
