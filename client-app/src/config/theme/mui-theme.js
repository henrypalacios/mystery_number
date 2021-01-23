import { createMuiTheme } from "@material-ui/core";

const primaryColor = "#0D61E2";
const dashColor = "#E3E6EF";

/*
 * Reference
 * https://github.com/mui-org/material-ui/blob/master/src/styles/getMuiTheme.js
 */

const muiTheme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial"',
  },
  grid: {
    backgroundColor: primaryColor,
  },
});

const myTheme = {
  dashColor,
};

export { muiTheme, myTheme };
