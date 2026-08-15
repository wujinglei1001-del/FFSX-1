import { useTranslation } from 'react-i18next';
import { Avatar, Box, Button, Stack, TextField, Typography } from '@mui/material';
import { users } from 'data/users';
import i18n from 'locales/i18n';
import IconifyIcon from 'components/base/IconifyIcon';
import DashboardMenu from 'components/common/DashboardMenu';

const notes = [
  {
    id: 0,
    author: users[0],
    get message() {
      return i18n.t(
        'ui.sections.hiring.admin.candidate_details.candidate_passed_resume_screening_strong_academic_ba_315663da',
      );
    },
    createdAt: 'Today at 12:10pm',
  },
  {
    id: 1,
    author: users[1],
    get message() {
      return i18n.t(
        'ui.sections.hiring.admin.candidate_details.tech_panel_provided_positive_feedback_team_feels_can_b742a62b',
      );
    },
    createdAt: 'Today at 12:10pm',
  },
  {
    id: 2,
    author: users[2],
    get message() {
      return i18n.t(
        'ui.sections.hiring.admin.candidate_details.discussed_compensation_expectations_slightly_above_o_6221fbb1',
      );
    },
    createdAt: 'Today at 12:10pm',
  },
  {
    id: 3,
    author: users[3],
    get message() {
      return i18n.t(
        'ui.sections.hiring.admin.candidate_details.candidate_officially_accepted_the_offer_start_date_c_0858287a',
      );
    },
    createdAt: 'Today at 12:10pm',
  },
];

const Notes = () => {
  const { t: translateUi } = useTranslation();
  return (
    <div>
      <Box sx={{ py: 3, textAlign: 'right' }}>
        <Stack
          direction="row"
          sx={{
            gap: 2,
            mb: 1,
          }}
        >
          <Avatar variant="circular" src={users[15].avatar} sx={{ height: 48, width: 48 }} />

          <TextField
            fullWidth
            label={translateUi(
              'ui.sections.hiring.admin.candidate_details.add_your_preview_d3be9f54',
            )}
            multiline
            rows={2}
          />
        </Stack>

        <Button variant="contained" sx={{ minWidth: 120 }}>
          {translateUi('ui.sections.hiring.admin.candidate_details.save_efc007a3')}
        </Button>
      </Box>
      {notes.map((note) => {
        return (
          <Stack
            key={note.id}
            direction="row"
            sx={{
              gap: 2,
              position: 'relative',
              py: 3,
              borderTop: 1,
              borderColor: 'dividerLight',
            }}
          >
            <Stack
              direction="row"
              sx={{
                gap: 0.5,
                position: 'absolute',
                right: 0,
                top: 24,
              }}
            >
              <Button shape="square" size="small" variant="soft" color="neutral">
                <IconifyIcon icon="material-symbols:edit-outline" />
              </Button>

              <DashboardMenu
                variant="soft"
                icon={<IconifyIcon icon="material-symbols:more-vert" />}
              />
            </Stack>
            <Avatar variant="circular" src={note.author.avatar} sx={{ height: 48, width: 48 }} />
            <div>
              <Box
                sx={{
                  mb: 2,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    mb: 0.5,
                  }}
                >
                  {note.author.name}
                </Typography>
                <Typography variant="caption" component="p" color="textSecondary">
                  {note.createdAt}
                </Typography>
              </Box>

              <Typography variant="body2" color="textSecondary">
                {note.message}
              </Typography>
            </div>
          </Stack>
        );
      })}
    </div>
  );
};

export default Notes;
