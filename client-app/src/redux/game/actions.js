const actions = {
  DISPLAY_NUMBER_BEGIN: "DISPLAY_NUMBER_BEGIN",
  DISPLAY_NUMBER_SUCCESS: "DISPLAY_NUMBER_SUCCESS",
  DISPLAY_NUMBER_ERROR: "DISPLAY_NUMBER_ERROR",

  HISTORY_READ_BEGIN: "HISTORY_READ_BEGIN",
  HISTORY_READ_SUCCESS: "HISTORY_READ_SUCCESS",
  HISTORY_READ_ERROR: "HISTORY_READ_ERROR",

  PLAY_ROUND_BEGIN: "PLAY_ROUND_BEGIN",
  PLAY_ROUND_SUCCESS: "PLAY_ROUND_SUCCESS",
  PLAY_ROUND_ERROR: "PLAY_ROUND_ERROR",

  displayNumberBegin: () => {
    return { type: actions.DISPLAY_NUMBER_BEGIN };
  },

  displayNumberSuccess: (data) => {
    return { type: actions.DISPLAY_NUMBER_SUCCESS, data };
  },

  displayNumberError: (error) => {
    return { type: actions.DISPLAY_NUMBER_ERROR, error };
  },

  updateRoundBegin: () => {
    return { type: actions.PLAY_ROUND_BEGIN };
  },
  updateRoundSuccess: (data) => {
    return { type: actions.PLAY_ROUND_SUCCESS, data };
  },
  updateRoundError: (error) => {
    return { type: actions.PLAY_ROUND_ERROR, error };
  },
};

export default actions;
