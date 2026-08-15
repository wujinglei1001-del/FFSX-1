import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Divider, Paper, Tab, Tabs, Toolbar } from '@mui/material';
import { productDescriptions, productSpecifications } from 'data/e-commerce/products';
import ProductFeedback from '../feedback';
import ProductDescription from './ProductDescription';
import ProductSpecification from './ProductSpecification';

const ProductInformation = () => {
  const { t: translateUi } = useTranslation();
  const [activeTab, setActiveTab] = useState('desc');

  const refs = {
    desc: useRef(null),
    specs: useRef(null),
    feedback: useRef(null),
  };
  const tabsRef = useRef(null);

  const handleScroll = () => {
    const tabBottom = tabsRef.current?.getBoundingClientRect().bottom || 0;
    const scrollPos = window.scrollY + tabBottom + 40;
    const offsets = {
      desc: refs.desc.current?.offsetTop || 0,
      specs: refs.specs.current?.offsetTop || 0,
      feedback: refs.feedback.current?.offsetTop || 0,
    };
    setActiveTab(
      scrollPos >= offsets.feedback ? 'feedback' : scrollPos >= offsets.specs ? 'specs' : 'desc',
    );
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    const top =
      (refs[newValue].current?.offsetTop || 0) - (tabsRef.current?.offsetHeight || 0) - 160;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <Paper sx={{ p: { xs: 3, md: 5 } }}>
      <Box
        ref={tabsRef}
        sx={(theme) => ({
          width: 1,
          position: 'sticky',
          zIndex: 10,
          py: 1,
          top: theme.mixins.ecommerceTopbar,
          bgcolor: 'background.default',
        })}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label={translateUi(
            'ui.sections.ecommerce.customer.product_details.product_information_tabs_c60701d9',
          )}
        >
          <Tab
            value="desc"
            label={translateUi(
              'ui.sections.ecommerce.customer.product_details.description_55f8ebc8',
            )}
          />
          <Tab
            value="specs"
            label={translateUi(
              'ui.sections.ecommerce.customer.product_details.specification_1ccf5d25',
            )}
          />
          <Tab
            value="feedback"
            label={translateUi(
              'ui.sections.ecommerce.customer.product_details.ratings_reviews_79cced2f',
            )}
          />
        </Tabs>
      </Box>
      <Toolbar sx={{ minHeight: { xs: 40 } }} />
      <div ref={refs.desc}>
        <ProductDescription descriptions={productDescriptions} />
      </div>
      <Divider sx={{ my: 5 }} />
      <div ref={refs.specs}>
        <ProductSpecification specifications={productSpecifications} />
      </div>
      <Divider sx={{ my: 5 }} />
      <div ref={refs.feedback}>
        <ProductFeedback />
      </div>
    </Paper>
  );
};

export default ProductInformation;
