import React, { useEffect, useState } from "react";
import { Card, CardHeader } from "@material-ui/core";
import {
  FormControl,
  FormLabel,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@material-ui/core";
import { ListItem, List, ListItemText } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

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
      <Card>
        <CardHeader
          title="Player's Number"
          subheader="Will the mystery number be higher or lower than this number?"
        />
        <p>
          <strong>{displayedNumber}</strong>
        </p>
      </Card>
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
      <Card>
        <CardHeader title="Betting Window" />

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
              Let's Play
            </Button>
          </FormControl>
        </form>
      </Card>
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
      <Card>
        <CardHeader title="History Operations" />
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
      </Card>
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
        <h1>Mystery Number Game</h1>
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
