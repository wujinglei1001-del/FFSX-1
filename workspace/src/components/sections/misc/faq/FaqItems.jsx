import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import illustrationDark from 'assets/images/illustrations/21-dark.webp';
import illustration from 'assets/images/illustrations/21.webp';
import { kebabCase } from 'lib/utils';
import { useFaqContext } from 'providers/FaqProvider';
import AnchorLinkContainer from 'components/base/AnchorLinkContainer';
import Image from 'components/base/Image';
import ScrollSpyContent from 'components/scroll-spy/ScrollSpyContent';

const FaqItems = () => {
  const { t: translateUi } = useTranslation();
  const { activeCategory, activeFaqItem, handleActiveItemChange } = useFaqContext();

  return (
    <Box sx={{ mx: 'auto', maxWidth: 600 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        {activeCategory?.subheader}
      </Typography>
      <Box sx={{ mb: 6 }}>
        {activeCategory?.items.map((item) => {
          const isActive = activeFaqItem === item.question;

          return (
            <Box key={item.id} sx={{ mb: 5 }}>
              <ScrollSpyContent
                id={kebabCase(item.question)}
                sx={{
                  mb: 1,
                  scrollMarginTop: '424px !important',
                }}
              >
                <AnchorLinkContainer anchorSize="small" hashHref={kebabCase(item.question)}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: isActive ? 'primary.main' : 'text.primary',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleActiveItemChange(item.question)}
                  >
                    {item.question}
                  </Typography>
                </AnchorLinkContainer>
              </ScrollSpyContent>
              <Typography
                variant="body2"
                dangerouslySetInnerHTML={{ __html: item.answer }}
                sx={{
                  color: 'text.secondary',
                }}
              />
            </Box>
          );
        })}
      </Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{
          gap: 2,
          p: 3,
          mx: 'auto',
          maxWidth: 1,
          alignItems: 'center',
          bgcolor: 'background.elevation1',
          borderRadius: 6,
        }}
      >
        <Box sx={{ p: 5 }}>
          <Image src={{ light: illustration, dark: illustrationDark }} sx={{ width: 56 }} />
        </Box>
        <div>
          <Typography variant="h6" sx={{ mb: 1, textAlign: { xs: 'center', sm: 'left' } }}>
            {translateUi(
              'ui.sections.misc.faq.faqitems.haven_t_found_the_answer_you_were_looking_for_e8cd17e2',
            )}
          </Typography>
          <Typography
            variant="body2"
            sx={{ mb: 3, color: 'text.secondary', textAlign: { xs: 'center', sm: 'left' } }}
          >
            {translateUi(
              'ui.sections.misc.faq.faqitems.feel_free_to_message_us_or_give_us_a_call_ae60fd2f',
            )}
          </Typography>
          <Button variant="contained" sx={{ width: { xs: 1, sm: 'auto' } }}>
            {translateUi('ui.sections.misc.faq.faqitems.contact_us_4832e458')}
          </Button>
        </div>
      </Stack>
    </Box>
  );
};

export default FaqItems;
