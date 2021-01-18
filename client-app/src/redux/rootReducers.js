import { combineReducers } from "redux";
import { GameReducer } from "./game/reducers";

const rootReducers = combineReducers({
  game: GameReducer,
});

export default rootReducers;
