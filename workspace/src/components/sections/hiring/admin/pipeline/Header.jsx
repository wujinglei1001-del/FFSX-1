import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import PageBreadcrumb from 'components/sections/common/PageBreadcrumb';

const PipelineHeader = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper sx={{ px: { xs: 3, md: 5 }, py: 3 }}>
      <Stack
        sx={{
          gap: 2,
        }}
      >
        <PageBreadcrumb
          items={[
            {
              label: translateUi('ui.sections.hiring.admin.pipeline.home_70f8bb9a'),
              url: paths.hiringJobOpening,
            },
            {
              label: translateUi('ui.sections.hiring.admin.pipeline.pipeline_32b1d5a7'),
              active: true,
            },
          ]}
        />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            gap: 2,
            justifyContent: 'space-between',
            alignItems: { sm: 'flex-end' },
          }}
        >
          <Stack
            sx={{
              gap: 0.5,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                whiteSpace: { sm: 'nowrap' },
              }}
            >
              {translateUi('ui.sections.hiring.admin.pipeline.content_writer_b718c88f')}
            </Typography>

            <Stack
              direction="row"
              sx={{
                gap: 2,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 400,
                }}
              >
                {translateUi('ui.sections.hiring.admin.pipeline.marketing_e0c534a0')}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 400,
                }}
              >
                {translateUi('ui.sections.hiring.admin.pipeline.uk_branch_56446d96')}
              </Typography>
            </Stack>
          </Stack>

          <Stack
            direction="row"
            sx={{
              columnGap: { sm: 4, lg: 10 },
              rowGap: 1,
              justifyContent: { xs: 'space-between', sm: 'flex-end' },
              alignItems: 'flex-end',
              flexWrap: 'wrap',
            }}
          >
            <Stack
              direction="row"
              sx={{
                columnGap: 2,
                flexWrap: 'wrap',
                justifyContent: { sm: 'flex-end' },
                alignItems: 'flex-end',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontWeight: 700,
                    color: 'text.primary',
                  }}
                >
                  2{` `}
                </Box>
                {translateUi('ui.sections.hiring.admin.pipeline.vacancy_fec3f6d9')}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontWeight: 700,
                    color: 'text.primary',
                  }}
                >
                  10
                  {` `}
                </Box>
                {translateUi('ui.sections.hiring.admin.pipeline.candidates_b5bf8067')}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontWeight: 700,
                    color: 'text.primary',
                  }}
                >
                  {translateUi('ui.sections.hiring.admin.pipeline.john_carter_8c3e783c')}
                  {` `}
                </Box>
                {translateUi('ui.sections.hiring.admin.pipeline.hiring_lead_682b3ad5')}
              </Typography>
            </Stack>

            <Button
              href={paths.hiringJobApplication}
              variant="contained"
              startIcon={<IconifyIcon icon="material-symbols:add-rounded" />}
              sx={{ flexShrink: 0 }}
            >
              {translateUi('ui.sections.hiring.admin.pipeline.add_candidate_cbdce251')}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default PipelineHeader;
