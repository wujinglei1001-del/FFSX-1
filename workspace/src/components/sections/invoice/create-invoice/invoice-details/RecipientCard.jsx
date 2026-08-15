import { useTranslation } from 'react-i18next';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import InfoRow from './InfoRow';

const RecipientCard = ({ title, data, editButton = true, setOpen, sxProps }) => {
  const { t: translateUi } = useTranslation();
  return (
    <>
      <Stack
        direction="row"
        sx={{ gap: 1, justifyContent: 'space-between', alignItems: 'center', mb: 3 }}
      >
        <Typography variant="h6" sx={{ ...sxProps }}>
          {title}
        </Typography>
        {editButton && (
          <IconButton onClick={() => setOpen && setOpen(true)}>
            <IconifyIcon
              icon="material-symbols-light:edit-outline"
              sx={{ fontSize: 20, color: 'neutral.dark' }}
            />
          </IconButton>
        )}
      </Stack>
      <Box>
        <InfoRow
          label={translateUi('ui.sections.invoice.create_invoice.invoice_details.name_709a2322')}
          value={data.name}
        />
        <InfoRow
          label={translateUi(
            'ui.sections.invoice.create_invoice.invoice_details.phone_number_ab25d61b',
          )}
          value={data.phone}
        />
        <InfoRow
          label={translateUi(
            'ui.sections.invoice.create_invoice.invoice_details.email_address_09ba557f',
          )}
          value={data.email}
        />
        <InfoRow
          label={translateUi('ui.sections.invoice.create_invoice.invoice_details.address_d70f93df')}
          value={data.address}
        />
        {data.issueDate && (
          <InfoRow
            label={translateUi(
              'ui.sections.invoice.create_invoice.invoice_details.issue_date_54e4d60d',
            )}
            value={data.issueDate}
          />
        )}
      </Box>
    </>
  );
};
export default RecipientCard;
