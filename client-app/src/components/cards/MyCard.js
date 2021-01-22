import { Card, CardHeader } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  card: {
    margin: theme.spacing(10),
    padding: theme.spacing(2),
    textAlign: "center",
  },
});

const MyCard = withStyles(styles)(({ classes, item, children }) => {
  const { title, subheader } = item;

  return (
    <Card className={classes.card}>
      <CardHeader title={title} subheader={subheader} />
      {children}
    </Card>
  );
});

export default MyCard;
