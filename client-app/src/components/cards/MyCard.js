import { Card, CardHeader } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  card: {
    marginRight: theme.spacing(10),
    marginLeft: theme.spacing(10),
    marginBottom: theme.spacing(6),
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
