import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styled = (theme) => ({
  grid: {
    textAlign: "center",
  },
});

const Item = withStyles(styled)(({ classes, props, children }) => (
  <Grid className={classes.grid} xs={12} item {...props}>
    {children}
  </Grid>
));

export default Item;
