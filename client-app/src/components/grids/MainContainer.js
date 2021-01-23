import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { myTheme } from "../../config/theme/mui-theme";

const styled = (theme) => ({
  grid: {
    backgroundColor: myTheme.dashColor,
    paddingTop: theme.spacing(13),
    height: "100%",
  },
});
const MainContainer = withStyles(styled)(({ classes, props, children }) => (
  <Grid className={classes.grid} container {...props}>
    {children}
  </Grid>
));

export default MainContainer;
