import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  FormLabel,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Typography,
} from "@material-ui/core";
import { ListItem, List, ListItemText } from "@material-ui/core";
import { Grid } from "@material-ui/core";

import MyCard from "../../components/cards/MyCard";
import { onDisplayNumber, onPlayRound } from "../../redux/game/actionCreator";
import { setProvider } from "../../redux/ethereum-provider/actionCreator";

function DisplayNumber() {
  const dispatch = useDispatch();
  const { displayedNumber } = useSelector((state) => {
    return {
      displayedNumber: state.game.displayNumber,
    };
  });

  const generatePlayerNumber = () => {
    return Math.floor(Math.random() * 10);
  };

  useEffect(() => {
    if (!displayedNumber) {
      dispatch(onDisplayNumber(generatePlayerNumber()));
    }
  }, [dispatch, displayedNumber]);

  return (
    <section>
      <MyCard
        item={{
          title: "Player's Number",
          subheader:
            "Will the mystery number be higher or lower than this number?",
        }}
      >
        <Typography variant="h4">{displayedNumber}</Typography>
      </MyCard>
    </section>
  );
}

function BettingWindow() {
  const initialState = {
    highLow: "higher",
    wager: 0.1,
  };
  const [values, setValues] = useState(initialState);
  const { displayedNumber, error } = useSelector((state) => {
    return {
      displayedNumber: state.game.displayNumber,
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
              Place a Wager
            </Button>
          </FormControl>
        </form>
      </MyCard>
    </section>
  );
}

const HistoryOperations = () => {
  const { history } = useSelector((state) => {
    return {
      history: state.game.roundHistory,
    };
  });

  return (
    <section>
      <MyCard item={{ title: "History Operations" }}>
        <List>
          {history.map((round) => (
            <ListItem key={round.transactionHash}>
              <ListItemText
                key={round.transactionHash}
                primary={`Result:\t${round.result}`}
                secondary={
                  `You ${round.result} ${round.wager} ETH by guessing ${round.displayedNumber}` +
                  ` would be ${round.guess} than mystery number ${round.mysteryNumber}!`
                }
              />
            </ListItem>
          ))}
        </List>
      </MyCard>
    </section>
  );
};

function Game() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      await dispatch(setProvider());
    })();
  });

  return (
    <div>
      <header>
        <h1></h1>
      </header>
      <main>
        <DisplayNumber />
        <BettingWindow />
        <HistoryOperations />
      </main>
      <footer>
        <p></p>
      </footer>
    </div>
  );
}

export default Game;
