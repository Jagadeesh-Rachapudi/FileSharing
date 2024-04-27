import { createStore } from "redux";
import questionRedcuer from "./questionReducer";
import { loadState, saveState } from "./localStorage";

const initialState = loadState() || [
  {
    index: 1,
    question: "Who is modi",
    answer: "PM of india",
    hasImg: true,
    Img: "Not Available"
  },
  {
    index: 2,
    question: "Who is KCR",
    answer: "CM of Telangana",
    hasImg: false,
    Img: "Not Available"
  },
  {
    index: 3,
    question: "Who is Jagan",
    answer: "CM of Andhra",
    hasImg: false,
    Img: "Not Available"
  }
];

const store = createStore(questionRedcuer, initialState);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
