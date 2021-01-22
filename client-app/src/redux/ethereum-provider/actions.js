const actions = {
  SET_PROVIDER_BEGIN: "SET_PROVIDER_BEGIN",
  SET_PROVIDER_SUCCESS: "SET_PROVIDER_SUCCESS",
  SET_PROVIDER_ERROR: "SET_PROVIDER_ERROR",

  setProviderBegin: () => {
    return { type: actions.SET_PROVIDER_BEGIN };
  },

  setProviderSuccess: (data) => {
    return { type: actions.SET_PROVIDER_SUCCESS, data };
  },

  setProviderError: (error) => {
    return { type: actions.SET_PROVIDER_ERROR, error };
  },
};

export default actions;
