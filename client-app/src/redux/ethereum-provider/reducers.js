import actions from "./actions";

const initialState = {
  web3Provider: null,
  networdId: null,
  loading: false,
  error: null,
};

const ProviderReducer = (state = initialState, action) => {
  const { type, data, error } = action;

  switch (type) {
    case actions.SET_PROVIDER_BEGIN:
      return { ...state, loading: true };

    case actions.SET_PROVIDER_SUCCESS:
      return {
        ...state,
        loading: false,
        web3Provider: data.web3,
        networkId: data.networkId,
      };

    case actions.SET_PROVIDER_ERROR:
      return {
        ...state,
        loading: false,
        error,
      };

    default:
      return state;
  }
};

export { ProviderReducer };
