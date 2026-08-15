import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import illustrationDark from 'assets/images/illustrations/2-dark.webp';
import illustration from 'assets/images/illustrations/2.webp';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import i18n from 'locales/i18n';
import * as yup from 'yup';
import Image from 'components/base/Image';
import StyledTextField from 'components/styled/StyledTextField';

const comingSoonSchema = yup.object({
  email: yup
    .string()
    .email(i18n.t('ui.pages.landing.comingsoon.email_must_be_a_valid_email_8ab7d26c'))
    .required(i18n.t('ui.pages.landing.comingsoon.email_is_required_c79fce0e')),
});
dayjs.extend(duration);
const initialDuration = dayjs.duration({
  days: 360,
  hours: 21,
  minutes: 51,
  seconds: 39,
});
const formatTime = (timeLeft) => {
  if (!timeLeft || timeLeft.asSeconds() <= 0) {
    return { days: 0, hours: '00', minutes: '00', seconds: '00' };
  }
  return {
    days: Math.floor(timeLeft.asDays()),
    hours: String(timeLeft.hours()).padStart(2, '0'),
    minutes: String(timeLeft.minutes()).padStart(2, '0'),
    seconds: String(timeLeft.seconds()).padStart(2, '0'),
  };
};
const TimeBox = ({ time, title }) => {
  return (
    <Paper
      variant="elevation"
      elevation={0}
      background={2}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: { xs: 80, sm: 104 },
        aspectRatio: '1/1',
      }}
    >
      <Typography variant="h3">{time}</Typography>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        {title}
      </Typography>
    </Paper>
  );
};
const LandingComingSoon = () => {
  const { t: translateUi } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(comingSoonSchema),
    defaultValues: {
      email: '',
    },
  });
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime.asSeconds() <= 1) {
          clearInterval(intervalId);
          return dayjs.duration(0);
        }
        return dayjs.duration(prevTime.asSeconds() - 1, 'seconds');
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);
  const { days, hours, minutes, seconds } = formatTime(timeLeft);
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Stack
      sx={{
        px: { xs: 3, md: 5 },
        pb: 15,
        pt: 12,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Image
        src={{
          light: illustration,
          dark: illustrationDark,
        }}
        alt={translateUi('ui.pages.landing.comingsoon.character_f0db3fa4')}
        sx={{ width: 1, maxWidth: 440, objectFit: 'contain', mb: 2 }}
      />
      <Stack
        direction="row"
        sx={{
          mb: 6,
          gap: { xs: 0.5, sm: 1 },
        }}
      >
        <TimeBox time={days} title={translateUi('ui.pages.landing.comingsoon.days_f6bb0f46')} />
        <TimeBox time={hours} title={translateUi('ui.pages.landing.comingsoon.hours_9e25a34e')} />
        <TimeBox
          time={minutes}
          title={translateUi('ui.pages.landing.comingsoon.minutes_092f99ea')}
        />
        <TimeBox
          time={seconds}
          title={translateUi('ui.pages.landing.comingsoon.seconds_5fb1db52')}
        />
      </Stack>
      <div>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {translateUi('ui.pages.landing.comingsoon.we_are_coming_soon_ed857c53')}
        </Typography>

        <Typography variant="subtitle1" sx={{ mb: 3, color: 'text.secondary' }}>
          {translateUi(
            'ui.pages.landing.comingsoon.stay_tuned_exciting_updates_are_on_the_way_while_our_db69204b',
          )}{' '}
          <Box
            component="span"
            sx={{
              whiteSpace: 'nowrap',
            }}
          >
            {translateUi('ui.pages.landing.comingsoon.something_speacial_4126f3f2')}
          </Box>
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            direction="row"
            sx={{ gap: 1, maxWidth: 400, mx: 'auto', alignItems: 'flex-start' }}
          >
            <StyledTextField
              variant="filled"
              placeholder={translateUi('ui.pages.landing.comingsoon.email_84add5b2')}
              type="email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ flexGrow: 1 }}
            />
            <Button type="submit" variant="soft" color="neutral">
              {translateUi('ui.pages.landing.comingsoon.send_now_dae33010')}
            </Button>
          </Stack>
        </form>
      </div>
    </Stack>
  );
};
export default LandingComingSoon;
