import getWeb3 from "../../utils/getWeb3";
import actions from "./actions";

const { setProviderBegin, setProviderSuccess, setProviderError } = actions;

const setProvider = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(setProviderBegin());
      const web3 = await getWeb3();
      const networkId = await web3.eth.net.getId();

      if (web3 == null || networkId == null) {
        throw new Error("It was not possible to find an ethereum provider");
      }

      dispatch(setProviderSuccess({ web3, networkId }));
    } catch (e) {
      /* handle error */
      await dispatch(
        setProviderError("It was possible to find an Ethereum provider")
      );

      console.error("SetProviderError: ", e);
    }
  };
};

export { setProvider };
