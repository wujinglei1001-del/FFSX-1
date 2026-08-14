export default {
  lineClamp: {
    style: (props) => {
      const lineClampValue =
        typeof props.lineClamp === 'number' || typeof props.lineClamp === 'string'
          ? props.lineClamp
          : 1;

      return {
        display: '-webkit-box',
        WebkitLineClamp: String(lineClampValue),
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      };
    },
  },
};
