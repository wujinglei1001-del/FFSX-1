import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { useSettingsContext } from 'providers/SettingsProvider';
import Image from 'components/base/Image';

const BlogStory = () => {
  const { t: translateUi } = useTranslation();
  const {
    config: { assetsDir },
  } = useSettingsContext();

  return (
    <div>
      <Box sx={{ aspectRatio: '16 / 10', width: 1, mb: { xs: 3, md: 5 }, position: 'relative' }}>
        <Image
          src={`${assetsDir}/images/content/details/blog/1.webp`}
          sx={{
            position: 'absolute',
            inset: 0,
            height: 1,
            width: 1,
            borderRadius: 5,
            mb: { xs: 3, md: 5 },
          }}
        />
      </Box>
      <Box id="introduction" sx={{ mb: { xs: 3, mb: 5 } }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {translateUi('ui.sections.content.details.blog.introduction_2473e96b')}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          {translateUi(
            'ui.sections.content.details.blog.architecture_is_more_than_just_building_design_it_is_7bc0e0ab',
          )}
        </Typography>
      </Box>
      <Box id="evolution" sx={{ mb: { xs: 3, mb: 5 } }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          {translateUi('ui.sections.content.details.blog.the_evolution_of_architecture_3b42d01c')}
        </Typography>
        <Typography
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          {translateUi('ui.sections.content.details.blog.ancient_civilizations_44bde31f')}
        </Typography>
        <Typography sx={{ mb: 3, color: 'text.secondary' }}>
          {translateUi(
            'ui.sections.content.details.blog.structures_like_the_egyptian_pyramids_and_the_greek__ebb194f9',
          )}
        </Typography>
        <Typography
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          {translateUi('ui.sections.content.details.blog.medieval_marvels_24363ebf')}
        </Typography>
        <Typography sx={{ mb: 3, color: 'text.secondary' }}>
          {translateUi(
            'ui.sections.content.details.blog.structures_like_the_egyptian_pyramids_and_the_greek__ebb194f9',
          )}
        </Typography>
        <Typography
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          {translateUi('ui.sections.content.details.blog.modern_and_postmodern_designs_6251743e')}
        </Typography>
        <Typography sx={{ mb: 3, color: 'text.secondary' }}>
          {translateUi(
            'ui.sections.content.details.blog.the_20th_century_saw_the_rise_of_steel_and_concrete__8351b69c',
          )}
        </Typography>
        <Image
          src={`${assetsDir}/images/content/details/blog/2.webp`}
          alt={translateUi('ui.sections.content.details.blog.image_0e762927')}
          sx={{ objectFit: 'cover', mb: 1, width: 1, height: 460 }}
        />
        <Typography component="p" variant="caption" sx={{ textAlign: 'center' }}>
          {translateUi('ui.sections.content.details.blog.fig_image_0a2f6eda')}
        </Typography>
      </Box>
      <Box id="principle" sx={{ mb: { xs: 3, mb: 5 } }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          {translateUi('ui.sections.content.details.blog.core_principles_of_architecture_9cfe0d5d')}
        </Typography>
        <Typography
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          {translateUi('ui.sections.content.details.blog.functionality_79fde2ac')}
        </Typography>
        <Typography sx={{ mb: 3, color: 'text.secondary' }}>
          {translateUi(
            'ui.sections.content.details.blog.at_its_core_architecture_serves_the_needs_of_its_use_c8d04488',
          )}
        </Typography>
        <Typography
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          {translateUi('ui.sections.content.details.blog.aesthetics_e041e120')}
        </Typography>
        <Typography sx={{ mb: 3, color: 'text.secondary' }}>
          {translateUi(
            'ui.sections.content.details.blog.designs_evoke_emotions_combining_symmetry_balance_an_c94a3eb6',
          )}
        </Typography>
        <Typography
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          {translateUi('ui.sections.content.details.blog.modern_and_postmodern_designs_6251743e')}
        </Typography>
        <Typography sx={{ mb: 3, color: 'text.secondary' }}>
          {translateUi(
            'ui.sections.content.details.blog.the_20th_century_saw_the_rise_of_steel_and_concrete__8351b69c',
          )}
        </Typography>
        <Image
          src={`${assetsDir}/images/content/details/blog/3.webp`}
          alt={translateUi('ui.sections.content.details.blog.image_0e762927')}
          sx={{ objectFit: 'cover', mb: 1, width: 1, height: 150 }}
        />
        <Typography component="p" variant="caption" sx={{ textAlign: 'center' }}>
          {translateUi('ui.sections.content.details.blog.fig_image_0a2f6eda')}
        </Typography>
      </Box>
      <Box id="iconic" sx={{ mb: { xs: 3, mb: 5 } }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          {translateUi('ui.sections.content.details.blog.iconic_architectural_styles_f194a97d')}
        </Typography>
        <Typography
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          {translateUi('ui.sections.content.details.blog.gothic_a4cc20dd')}
        </Typography>
        <Typography sx={{ mb: 3, color: 'text.secondary' }}>
          {translateUi(
            'ui.sections.content.details.blog.known_for_its_pointed_arches_and_ribbed_vaults_gothi_5fa41e87',
          )}
        </Typography>
        <Typography
          sx={{
            fontWeight: 7000,
            mb: 1,
          }}
        >
          {translateUi('ui.sections.content.details.blog.baroque_9f853049')}
        </Typography>
        <Typography sx={{ mb: 3, color: 'text.secondary' }}>
          {translateUi(
            'ui.sections.content.details.blog.characterized_by_grandeur_and_drama_baroque_designs__9c150d3c',
          )}
        </Typography>
        <Typography
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          {translateUi('ui.sections.content.details.blog.minimalism_8055e9b1')}
        </Typography>
        <Typography sx={{ mb: 3, color: 'text.secondary' }}>
          {translateUi(
            'ui.sections.content.details.blog.less_is_more_defines_this_style_focusing_on_simplici_d86a906f',
          )}
        </Typography>
        <Image
          src={`${assetsDir}/images/content/details/blog/4.webp`}
          alt={translateUi('ui.sections.content.details.blog.image_0e762927')}
          sx={{ objectFit: 'cover', mb: 1, width: 1, height: 300 }}
        />
        <Typography component="p" variant="caption" sx={{ textAlign: 'center' }}>
          {translateUi('ui.sections.content.details.blog.fig_image_0a2f6eda')}
        </Typography>
      </Box>
      <Box id="role-of-technology" sx={{ mb: { xs: 3, mb: 5 } }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          {translateUi(
            'ui.sections.content.details.blog.the_role_of_technology_in_architecture_dff9ecc7',
          )}
        </Typography>
        <Typography
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          {translateUi('ui.sections.content.details.blog.3d_printing_f8395fbc')}
        </Typography>
        <Typography sx={{ mb: 3, color: 'text.secondary' }}>
          {translateUi(
            'ui.sections.content.details.blog.architects_now_create_precise_models_and_even_full_s_166feda0',
          )}
        </Typography>
        <Typography
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          {translateUi('ui.sections.content.details.blog.smart_cities_9e235c16')}
        </Typography>
        <Typography sx={{ mb: 3, color: 'text.secondary' }}>
          {translateUi(
            'ui.sections.content.details.blog.technology_integrates_sustainability_and_efficiency__25a60ad5',
          )}
        </Typography>
      </Box>
      <Box id="future-of-architecture" sx={{ mb: { xs: 3, md: 5 } }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          {translateUi('ui.sections.content.details.blog.the_future_of_architecture_8b5bed6a')}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          {translateUi(
            'ui.sections.content.details.blog.the_future_of_architecture_lies_in_adaptive_responsi_43559ff7',
          )}
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6" sx={{ mb: 3 }} id="conclusion">
          {translateUi('ui.sections.content.details.blog.conclusion_e39262de')}
        </Typography>
        <Typography sx={{ mb: { xs: 3, md: 5 }, color: 'text.secondary' }}>
          {translateUi(
            'ui.sections.content.details.blog.architecture_is_an_ever_evolving_discipline_that_har_67653373',
          )}
        </Typography>
      </Box>
    </div>
  );
};

export default BlogStory;
