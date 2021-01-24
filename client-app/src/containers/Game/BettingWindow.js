import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  FormLabel,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";

import MyCard from "../../components/cards/MyCard";
import { onDisplayNumber, onPlayRound } from "../../redux/game/actionCreator";

export default function BettingWindow() {
  const initialState = {
    highLow: "higher",
    wager: 0.1,
  };
  const [values, setValues] = useState(initialState);
  const { displayedNumber, error, loadingOrder } = useSelector((state) => {
    return {
      displayedNumber: state.game.displayNumber,
      loadingOrder: state.game.loadingOrder,
      error: state.ethereumProvider.error,
    };
  });
  const dispatch = useDispatch();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const playGame = () => {
    dispatch(
      onPlayRound({
        ...values,
        displayedNumber,
      })
    );
    dispatch(onDisplayNumber(null));
    setValues(initialState);
  };

  return (
    <section>
      <MyCard
        item={{
          title: "Betting Window",
        }}
      >
        <form autoComplete="off">
          <FormControl component="fieldset">
            <FormLabel component="legend">
              The mystery number will be:
            </FormLabel>
            <RadioGroup
              aria-label="gender"
              name="bit1"
              value={values.highLow}
              onChange={handleChange("highLow")}
            >
              <FormControlLabel
                value="higher"
                control={<Radio />}
                label="Higher"
              />
              <FormControlLabel
                value="lower"
                control={<Radio />}
                label="Lower"
              />
            </RadioGroup>

            <TextField
              required
              id="standard-wage"
              label="Required"
              placeholder="Put your wage in ether: 0.004"
              onChange={handleChange("wager")}
              value={values.wager}
            />

            <Button
              disabled={error ? true : false}
              variant="outlined"
              color="secondary"
              onClick={playGame}
            >
              {loadingOrder ? (
                <CircularProgress size="2rem" color="secondary" />
              ) : (
                "Place a Wager"
              )}
            </Button>
          </FormControl>
        </form>
      </MyCard>
    </section>
  );
}
