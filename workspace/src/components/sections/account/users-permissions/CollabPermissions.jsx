import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

const CollabPermissions = () => {
  const { t: translateUi } = useTranslation();
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="collabPermission"
      render={({ field }) => (
        <RadioGroup defaultValue="anyone" {...field}>
          <FormControlLabel
            value="anyone"
            control={<Radio />}
            label={translateUi(
              'ui.sections.account.users_permissions.collabpermissions.anyone_can_send_a_collaborator_request_441b4bdc',
            )}
          />
          <FormControlLabel
            value="only_code"
            control={<Radio />}
            label={translateUi(
              'ui.sections.account.users_permissions.collabpermissions.only_users_with_a_request_code_can_send_collaborator_942c99f7',
            )}
          />
        </RadioGroup>
      )}
    />
  );
};

export default CollabPermissions;
