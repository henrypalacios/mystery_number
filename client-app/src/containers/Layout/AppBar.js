import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

const styles = (theme) => ({
  flex: { flex: 0.5 },
  menuButton: { marginLeft: 0, marginRight: 20 },
});

const FixedPosition = withStyles(styles)(({ classes }) => (
  <AppBar position="fixed">
    <Toolbar>
      <Typography
        variant="Mystery Number Game"
        color="inherit"
        className={classes.flex}
      >
        Mystery Number Game
      </Typography>
      <Button color="inherit">Let's Play</Button>
      <ThumbUpIcon />
    </Toolbar>
  </AppBar>
));

export default FixedPosition;
