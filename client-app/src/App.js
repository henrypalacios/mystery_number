import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  ThemeProvider,
  createMuiTheme,
  ListItem,
  List,
  Button,
} from "@material-ui/core";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@material-ui/core";

function DisplayNumber() {
  const [playerNumber, setPlayerNumber] = useState();

  const generatePlayerNumber = () => {
    return Math.floor(Math.random() * 10);
  };

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setPlayerNumber(generatePlayerNumber());
    }

    return () => (unmounted = true);
  }, [setPlayerNumber]);

  return (
    <section>
      <Card>
        <CardHeader
          title="Player's Number"
          subheader="Will the mystery number be higher or lower than this number?"
        />
        <p>
          <strong>{playerNumber}</strong>
        </p>
      </Card>
    </section>
  );
}

function BettingWindow() {
  const [highLow, setHighLow] = useState("higher");

  const handleChange = (event) => {
    setHighLow(event.target.value);
  };

  const playGame = () => {
    console.log("Play with:", highLow);
  };

  return (
    <section>
      <Card>
        <CardHeader title="Betting Window" />

        <FormControl component="fieldset">
          <FormLabel component="legend">The mystery number will be:</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="bit1"
            value={highLow}
            onChange={handleChange}
          >
            <FormControlLabel
              value="higher"
              control={<Radio />}
              label="Higher"
            />
            <FormControlLabel value="lower" control={<Radio />} label="Lower" />
          </RadioGroup>

          <TextField
            required
            id="standard-required"
            label="Required"
            placeholder="Put your wage in ether format"
          />
          <Button variant="outlined" color="secondary" onClick={playGame}>
            Let's Play
          </Button>
        </FormControl>
      </Card>
    </section>
  );
}

const HistoryOperations = () => {
  const [history, setHistory] = useState([]);

  return (
    <section>
      <Card>
        <CardHeader title="History Operations" />
        <List>
          {history.map((round) => (
            <ListItem
              key={round.transactionHash}
              prymaryText={`Result: ${round.result}`}
              sencondaryText={
                `You ${round.result} ${round.wager} by guessing ${round.playerNumber}` +
                ` would be ${round.guess} than ${round.mysteryNumber}!`
              }
            />
          ))}
        </List>
      </Card>
    </section>
  );
};

const theme = createMuiTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
