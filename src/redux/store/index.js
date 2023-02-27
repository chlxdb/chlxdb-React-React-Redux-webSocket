import {legacy_createStore as createStore } from "redux";
import reducer from "./reduce";
const store=createStore(reducer)
export default store;