import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItem, List, ListItemText } from "@material-ui/core";
import { CircularProgress, Typography } from "@material-ui/core";

import MyCard from "../../components/cards/MyCard";
import Container from "../../components/grids/MainContainer";
import Item from "../../components/grids/Item";
import ModalConfirm from "../../components/modals/ModalConfirm";
import BettingWindow from "./BettingWindow";
import { onDisplayNumber } from "../../redux/game/actionCreator";
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
  const { loading, error } = useSelector((state) => {
    return {
      loading: state.ethereumProvider.loading,
      error: state.ethereumProvider.error,
    };
  });

  useEffect(() => {
    (async function () {
      await dispatch(setProvider());
    })();
  }, []);

  const onSetProvider = async () => {
    await dispatch(setProvider());
  };

  const renderGame = () => {
    if (loading) {
      return (
        <Fragment>
          <Item>
            <CircularProgress />
          </Item>
          <Item>
            <Typography>Setting Ethereum Provider...</Typography>
          </Item>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Item>
            <DisplayNumber />
          </Item>
          <Item>
            <BettingWindow />
          </Item>
          <Item>
            <HistoryOperations />
          </Item>
        </Fragment>
      );
    }
  };

  return (
    <div>
      <main>
        <Container>{renderGame()}</Container>
      </main>
      <footer>
        <p></p>
      </footer>
      <ModalConfirm
        title="Ethereum provider could not be configured"
        text={error}
        buttonText="Try Again..."
        onClick={() => onSetProvider()}
        activate={error ? true : false}
      />
    </div>
  );
}

export default Game;
