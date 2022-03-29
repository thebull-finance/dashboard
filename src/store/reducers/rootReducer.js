import { combineReducers } from "redux";

import settings from "./settings";
import session from "./session";
import user from "./user";
import ui from "./ui";
import views from "./views";
// import blockchainReducer from "../blockchain/blockchainReducer";
// import dataReducer from "../data/dataReducer";

export default combineReducers({
  session,
  settings,
  user,
  ui,
  views,
  // blockchain: blockchainReducer,
  // data: dataReducer,
});
