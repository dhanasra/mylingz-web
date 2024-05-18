import { combineReducers } from "@reduxjs/toolkit";

import menu from './menu'
import app from "./app";

const reducers = combineReducers({ menu, app })

export default reducers;