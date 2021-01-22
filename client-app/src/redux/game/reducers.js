import actions from "./actions";
import staticData from "../../demoData/historyRounds.json";

const initialState = {
  displayNumber: null,
  roundHistory: [],
  loading: false,
  error: null,
};

const GameReducer = (state = initialState, action) => {
  const { type, data, error } = action;

  switch (type) {
    case actions.DISPLAY_NUMBER_BEGIN:
      return { ...state, loading: true };

    case actions.DISPLAY_NUMBER_SUCCESS:
      return { ...state, displayNumber: data };

    case actions.DISPLAY_NUMBER_ERROR:
      return { ...state, error };

    case actions.PLAY_ROUND_BEGIN:
      return { ...state, loading: true };

    case actions.PLAY_ROUND_SUCCESS:
      return { ...state, roundHistory: data };

    case actions.PLAY_ROUND_ERROR:
      return { ...state, error };

    default:
      return state;
  }
};

export { GameReducer };
