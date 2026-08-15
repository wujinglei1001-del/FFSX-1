import { useTranslation } from 'react-i18next';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import NewMemberStepper from 'components/sections/member/new-member/NewMemberStepper';

const NewMember = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper sx={{ height: 1, p: { xs: 3, md: 5 } }}>
      <Container maxWidth="sm" disableGutters>
        <Typography
          variant="h4"
          sx={{
            mb: 3,
          }}
        >
          {translateUi('ui.sections.member.views.newmember.add_new_member_ba62e081')}
        </Typography>

        <NewMemberStepper />
      </Container>
    </Paper>
  );
};
export default NewMember;
