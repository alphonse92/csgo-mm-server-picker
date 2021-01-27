export const isHeadless = () => {
  try {
    return !!window;
  }
  catch (e) {
    return true;
  }
};
export const isElectron = () => {
  try {
    return process.versions['electron']
      || navigator
        .userAgent
        .toLowerCase()
        .indexOf(' electron/');
  } catch (e) {
    return false;
  }
};

export const isOnBrowser = () => !isHeadless() && !isElectron();
