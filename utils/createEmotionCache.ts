import createCache from '@emotion/cache';

// Boilerplate code required to setup Material UI v5 with NextJs
const createEmotionCache = () => {
  return createCache({ key: 'css' });
};

export default createEmotionCache;
