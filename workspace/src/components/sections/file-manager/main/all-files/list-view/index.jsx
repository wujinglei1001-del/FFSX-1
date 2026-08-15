import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useLightbox from 'hooks/useLightbox';
import { useFileManager } from 'providers/FileManagerProvider';
import Lightbox from 'components/base/Lightbox';
import FMDropdownMenu from 'components/sections/file-manager/common/FMDropdownMenu';
import FileRowItem from './FileRowItem';

const ListView = ({ allFiles, selectedFiles }) => {
  const { t: translateUi } = useTranslation();
  const { fileManagerDispatch } = useFileManager();
  const { openLightbox, ...lightboxProps } = useLightbox();

  const lightboxSlides = allFiles
    .map(({ name, extension, src }) => {
      switch (extension) {
        case 'png':
        case 'jpg':
        case 'jpeg':
          return { src, type: 'image', title: `${name + '.' + extension}` };
        case 'mp4':
          return {
            src,
            type: 'video',
            title: `${name + '.' + extension}`,
            sources: [{ src, type: 'video/mp4' }],
          };

        default:
          return null;
      }
    })
    .filter(Boolean);

  const fileIdToMediaIndex = new Map();
  allFiles
    .filter(({ extension }) => ['png', 'jpg', 'jpeg', 'mp4'].includes(extension))
    .forEach((file, index) => {
      fileIdToMediaIndex.set(file.id, index);
    });

  const allSelected = selectedFiles.length === allFiles.length;

  const someSelected = selectedFiles.length > 0 && selectedFiles.length < allFiles.length;

  const handleSelectAll = () => {
    if (allSelected) {
      fileManagerDispatch({ type: 'DESELECT_ALL_FILES' });
    } else {
      fileManagerDispatch({ type: 'SELECT_ALL_FILES' });
    }
  };

  return (
    <>
      <Box sx={{ display: 'grid', width: '100%' }}>
        <TableContainer component={Box} sx={{ pl: 0 }}>
          <Table
            sx={{
              minWidth: 1270,
              [`& .${tableCellClasses.root}`]: {
                py: 1.5,
              },
            }}
            aria-label={translateUi(
              'ui.sections.file_manager.main.all_files.file_manager_list_view_table_e58ea8fa',
            )}
            className="disable-edge-padding"
          >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={someSelected}
                    checked={allSelected}
                    onChange={handleSelectAll}
                    slotProps={{
                      input: {
                        'aria-label': 'select all files',
                      },
                    }}
                  />
                </TableCell>
                <TableCell sx={{ display: 'flex', alignItems: 'center', px: 0, gap: 2.5 }}>
                  <Box
                    sx={{
                      m: 0,
                      height: 40,
                      width: 40,
                      bgcolor: 'transparent',
                    }}
                  />
                  {translateUi('ui.sections.file_manager.main.all_files.name_709a2322')}
                </TableCell>
                <TableCell align="left">
                  {translateUi('ui.sections.file_manager.main.all_files.type_3deb7456')}
                </TableCell>
                <TableCell align="center">
                  {translateUi('ui.sections.file_manager.main.all_files.favorite_6b90b6a1')}
                </TableCell>
                <TableCell align="left">
                  {translateUi('ui.sections.file_manager.main.all_files.shared_50d0d8dd')}
                </TableCell>
                <TableCell align="left">
                  {translateUi('ui.sections.file_manager.main.all_files.modified_19a532c8')}
                </TableCell>
                <TableCell align="left">
                  {translateUi('ui.sections.file_manager.main.all_files.file_size_0fce4167')}
                </TableCell>
                <TableCell align="center">
                  <FMDropdownMenu />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allFiles.map((file) => (
                <FileRowItem
                  key={file.id}
                  file={file}
                  mediaIndex={fileIdToMediaIndex.get(file.id)}
                  openLightbox={openLightbox}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Lightbox
        slides={lightboxSlides}
        extension={['caption', 'fullscreen', 'slideshow', 'thumbnails', 'video', 'zoom']}
        {...lightboxProps}
      />
    </>
  );
};

export default ListView;
