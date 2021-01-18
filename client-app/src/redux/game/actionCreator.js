import { GameContract } from "../../contracts-api";
import actions from "./actions";

const {
  displayNumberBegin,
  displayNumberSuccess,
  displayNumberError,
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
  return async (dispatch) => {
    try {
      console.log(values);
      // const contract = await GameContract.build();
      // console.log(contract);
    } catch (e) {
      /* handle error */
      console.log(e);
    }
  };
};

export { onDisplayNumber, onPlayRound };
