import { UPDATE_STATE } from "./questionType";

const initialState = [
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

const questionReducer = (state = initialState, action) => {
  console.log("hello", action);
  switch (action.type) {
    case "UPDATE_STATE":
      const maxIndex = Math.max(...state.map((question) => question.index));
      const newQuestion = {
        index: maxIndex + 1,
        question: action.payload.question,
        answer: action.payload.answer,
        hasImg: action.payload.hasImg,
        img: action.payload.img
      };
      return [...state, newQuestion];
    default:
      return state;
  }
};

export default questionReducer;
