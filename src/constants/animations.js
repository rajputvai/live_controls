export default {
  flash: {
    '@keyframes flash': {
      '0%': {
        backgroundColor: 'rgba(183, 254, 213, 0.2)',
      },
      '50%': {
        backgroundColor: 'rgba(183, 254, 213, 1)',
      },
      '100%': {
        backgroundColor: 'rgba(183, 254, 213, 0.2)',
      },
    },
  },
  errorFlash: {
    '@keyframes loaderAnim': {
      to: {
        opacity: 0.4,
        transform: 'scale3d(0.6, 0.6, 1)',
      },
    },
  },
};
