export const types = {
  LOAD_CONFIG: 'CONFIG.LOAD_CONFIG',
  LOADING_CONFIG: 'CONFIG.LOADING_CONFIG',
  LOADED_CONFIG: 'CONFIG.LOADED_CONFIG',
};

export function loadConfig() {
  return {
    type: types.LOAD_CONFIG,
  };
}

export function loadingConfig() {
  return {
    type: types.LOADING_CONFIG,
  };
}

export function loadedConfig(config) {
  return {
    type: types.LOADED_CONFIG,
    payload: {
      config,
    },
  };
}
