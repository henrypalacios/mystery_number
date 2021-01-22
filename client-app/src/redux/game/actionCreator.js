import { GameContract } from "../../contracts-api";
import actions from "./actions";

const {
  displayNumberBegin,
  displayNumberSuccess,
  displayNumberError,

  updateRoundBegin,
  updateRoundSuccess,
  updateRoundError,
} = actions;

const onDisplayNumber = (value) => {
  return async (dispatch) => {
    try {
      dispatch(displayNumberBegin());
      dispatch(displayNumberSuccess(value));
    } catch (error) {
      dispatch(displayNumberError(error));
    }
  };
};

const onPlayRound = (values) => {
  return async (dispatch, getState) => {
    try {
      dispatch(updateRoundBegin());
      const { web3Provider, networkId } = getState().ethereumProvider;
      const { roundHistory } = getState().game;
      const contract = await GameContract.build(web3Provider, networkId);
      const { wager, displayedNumber } = values;

      let guessBoolean = values.highLow == "higher" ? true : false;

      const responseContract = await contract.winOrLose(
        displayedNumber,
        guessBoolean,
        wager
      );
      const result = {
        ...responseContract,
        ...{ wager, displayedNumber, guess: values.highLow },
      };

      dispatch(updateRoundSuccess([result].concat(roundHistory)));
    } catch (e) {
      /* handle error */
      console.error(e);
      dispatch(updateRoundError(e));
    }
  };
};

export { onDisplayNumber, onPlayRound };
