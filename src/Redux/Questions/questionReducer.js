import { ASK_QUESTION } from "./questionType";

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
  switch (action.type) {
    case ASK_QUESTION:
      return state.map((question) => {
        if (question.index === action.index) {
          return {
            ...question,
            question: "Who is Sundar",
            answer: "CEO of Google",
            hasImg: false,
            Img: "Not available"
          };
        } else {
          return question;
        }
      });
    default:
      return state;
  }
};

export default questionReducer;
