import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { OAuthProvider, signInWithPopup } from 'firebase/auth';
import { useSettingsContext } from 'providers/SettingsProvider';
import { rootPaths } from 'routes/paths';
import { firebaseAuth, googleProvider, microsoftProvider } from 'services/firebase/firebase';
import Image from 'components/base/Image';

const SocialAuth = () => {
  const { t: translateUi } = useTranslation();
  const navigate = useNavigate();
  const {
    config: { assetsDir },
  } = useSettingsContext();

  return (
    <Grid
      container
      spacing={2}
      sx={{
        alignItems: 'center',
      }}
    >
      <Grid
        size={{
          xs: 12,
          lg: 6,
        }}
      >
        <Button
          fullWidth
          variant="contained"
          color="neutral"
          size="large"
          sx={{ flex: 1, whiteSpace: 'nowrap' }}
          startIcon={
            <Image
              src={`${assetsDir}/images/logo/1.svg`}
              height={21}
              width={21}
              alt={translateUi('ui.sections.authentications.default.socialauth.icon_f8995ba5')}
            />
          }
          onClick={async () => {
            await signInWithPopup(firebaseAuth, googleProvider);
            navigate(rootPaths.root);
          }}
        >
          {translateUi(
            'ui.sections.authentications.default.socialauth.sign_in_with_google_5797838c',
          )}
        </Button>
      </Grid>
      <Grid
        size={{
          xs: 12,
          lg: 6,
        }}
      >
        <Button
          fullWidth
          variant="contained"
          color="neutral"
          size="large"
          sx={{ flex: 1, whiteSpace: 'nowrap' }}
          startIcon={
            <Image
              src={`${assetsDir}/images/logo/2.svg`}
              height={21}
              width={21}
              alt={translateUi('ui.sections.authentications.default.socialauth.icon_f8995ba5')}
            />
          }
          onClick={async () => {
            const res = await signInWithPopup(firebaseAuth, microsoftProvider);
            console.log({ res });
            const credential = OAuthProvider.credentialFromResult(res);
            console.log({ credential });
          }}
        >
          {translateUi(
            'ui.sections.authentications.default.socialauth.sign_in_with_microsoft_fd62c61f',
          )}
        </Button>
      </Grid>
    </Grid>
  );
};

export default SocialAuth;
