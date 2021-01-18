const actions = {
  DISPLAY_NUMBER_BEGIN: "DISPLAY_NUMBER_BEGIN",
  DISPLAY_NUMBER_SUCCESS: "DISPLAY_NUMBER_SUCCESS",
  DISPLAY_NUMBER_ERROR: "DISPLAY_NUMBER_ERROR",

  HISTORY_READ_BEGIN: "HISTORY_READ_BEGIN",
  HISTORY_READ_SUCCESS: "HISTORY_READ_SUCCESS",
  HISTORY_READ_ERROR: "HISTORY_READ_ERROR",

  displayNumberBegin: () => {
    return { type: actions.DISPLAY_NUMBER_BEGIN };
  },

  displayNumberSuccess: (data) => {
    return { type: actions.DISPLAY_NUMBER_SUCCESS, data };
  },

  displayNumberError: (error) => {
    return { type: actions.DISPLAY_NUMBER_ERROR, error };
  },
};

export default actions;
