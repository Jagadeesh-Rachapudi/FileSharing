import { createStore } from "redux";
import questionRedcuer from "./questionReducer";

const store = createStore(questionRedcuer);

export default store;
