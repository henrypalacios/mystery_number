import { combineReducers } from "redux";
import { GameReducer } from "./game/reducers";
import { ProviderReducer } from "./ethereum-provider/reducers";

const rootReducers = combineReducers({
  game: GameReducer,
  ethereumProvider: ProviderReducer,
});

export default rootReducers;
