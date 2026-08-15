import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavContext } from 'layouts/main-layout/NavProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import Contact from './Contact';

const AssociatedContact = ({ associatedContactData }) => {
  const { t: translateUi } = useTranslation();
  const { topbarHeight } = useNavContext();

  return (
    <Stack
      sx={{
        p: { xs: 3, md: 5 },
        gap: 2,
        alignItems: 'flex-start',
        position: 'sticky',
        top: topbarHeight,
      }}
    >
      <Typography variant="h5">
        {translateUi('ui.sections.crm.deal_details.associated_contact.associated_contact_4babe801')}
      </Typography>
      {associatedContactData.map((contact) => (
        <Contact key={contact.id} contact={contact} />
      ))}
      <Button size="small" startIcon={<IconifyIcon icon="material-symbols:add" />}>
        {translateUi('ui.sections.crm.deal_details.associated_contact.add_more_contact_142ee7e5')}
      </Button>
    </Stack>
  );
};

export default AssociatedContact;
