import { Link as RouterLink } from 'react-router';
import { getHashFromTo, isPlainLeftClick, scrollToHash } from 'lib/hash-link-scroll';

const isNativeHref = (href) =>
  typeof href === 'string' && /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(href);

export const LinkBehavior = ({ ref, href, to, ...other }) => {
  const destination = to ?? href;

  if (destination == null || isNativeHref(destination)) {
    return <a ref={ref} href={destination} {...other} />;
  }

  return <RouterLink ref={ref} to={destination} {...other} />;
};
LinkBehavior.displayName = 'LinkBehavior';

export const HashLinkBehavior = ({ ref, ...props }) => {
  const { href, onClick, target, ...other } = props;

  const handleClick = (event) => {
    onClick?.(event);

    const hash = typeof href === 'string' ? getHashFromTo(href) : (href?.hash ?? '');

    if (hash && isPlainLeftClick(event) && (!target || target === '_self')) {
      scrollToHash(hash);
    }
  };

  return <RouterLink ref={ref} to={href} target={target} onClick={handleClick} {...other} />;
};
HashLinkBehavior.displayName = 'HashLinkBehavior';

const Link = {
  defaultProps: {
    component: LinkBehavior,
    underline: 'hover',
  },
  styleOverrides: {
    underlineHover: () => ({
      position: 'relative',
      backgroundImage: `linear-gradient(currentcolor, currentcolor)`,
      backgroundSize: '0% 1px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left bottom',
      transition: 'background-size 0.25s ease-in',
      '&:hover': {
        textDecoration: 'none',
        backgroundSize: '100% 1px',
      },
    }),
  },
};

export default Link;
