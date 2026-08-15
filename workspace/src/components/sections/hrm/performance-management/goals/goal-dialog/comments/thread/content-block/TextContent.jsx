import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Typography } from '@mui/material';

const TextContent = ({ content }) => {
  const { t: translateUi } = useTranslation();
  const [showMore, setShowMore] = useState(content.length < 250);

  return (
    <Typography variant="body2" sx={{ textWrap: 'pretty', color: 'text.secondary' }}>
      {content.slice(0, showMore ? content.length : 250)}
      {!showMore && '... '}
      {!showMore && (
        <Link onClick={() => setShowMore(true)} href="#!" sx={{ fontWeight: 700 }}>
          {translateUi('ui.sections.hrm.performance_management.goals.show_more_25911d48')}
        </Link>
      )}
    </Typography>
  );
};

export default TextContent;
