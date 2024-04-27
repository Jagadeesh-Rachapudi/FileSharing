import React, { useState, useRef, useEffect } from "react";
import "./Chat.scss";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";

const Chat = (props) => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState("");
  const [typed, setTyped] = useState("");
  const [answer, setAnswer] = useState("");
  const [displayAnswer, setDisplayAnswer] = useState("");
  const [image, setImage] = useState("");
  const [showImg, setShowImg] = useState(false);
  const [noQuestion, setNoQuestion] = useState(true);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [answer]);

  useEffect(() => {
    let words = answer.split(" ");
    let index = 0;
    let cursorVisible = true;

    const updateDisplayAnswer = () => {
      if (index < words.length) {
        const trimmedWord = words[index].trim();
        setDisplayAnswer((prevDisplayAnswer) => {
          let updatedAnswer = "";
          if (index === 0) {
            updatedAnswer = trimmedWord + (cursorVisible ? "        ▌" : "");
          } else {
            updatedAnswer =
              prevDisplayAnswer.trim().replace(/▌$/, "") +
              "   " +
              trimmedWord +
              (cursorVisible ? "      ▌" : "");
          }
          return updatedAnswer;
        });
        cursorVisible = !cursorVisible;
        index++;
        const randomDelay = Math.random() * (800 - 200) + 200;
        setTimeout(updateDisplayAnswer, randomDelay);
        setShowImg(false);
      } else {
        setDisplayAnswer((prevDisplayAnswer) =>
          prevDisplayAnswer.replace(/▌$/, "")
        );
        setShowImg(true);
      }
    };
    updateDisplayAnswer();
    return () => clearTimeout();
  }, [answer]);

  const handleChange = (e) => {
    setTyped(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNoQuestion(false);
    if (typed.trim() !== "") {
      try {
        const capitalizedQuestion =
          typed.charAt(0).toUpperCase() + typed.slice(1);

        const response = await fetch("http://localhost:5000/answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ question: capitalizedQuestion })
        });

        if (response.ok) {
          const responseData = await response.json();
          setAnswer(responseData.answer);
          setImage(responseData.image);
          setQuestion(capitalizedQuestion);
          setTyped("");
          dispatch({
            type: "UPDATE_STATE",
            payload: {
              question: capitalizedQuestion,
              answer: responseData.answer,
              hasImg: !!responseData.image,
              img: responseData.image || "Not available"
            }
          });
        } else {
          console.error("Failed to get answer from server");
        }
      } catch (error) {
        console.error("Error while getting answer:", error);
      }
    }
  };

  return (
    <div className="formContainer">
      {noQuestion ? (
        <div className="headingAndLogo">
          <img
            className="logo"
            src="https://firebasestorage.googleapis.com/v0/b/peronal-stuff-61ac6.appspot.com/o/Hacketon%2FYamaha_full_logo_Red.jpg?alt=media&token=411209ea-e033-4ccd-8227-05f28e7de9b4"
          />
          <h1 className="greetings">How Can I help you?</h1>
        </div>
      ) : (
        <>
          <div className="chatcontainer" ref={chatContainerRef}>
            {question && (
              <div>
                <h2>{question}</h2>
                <div className="answerContainer">
                  <div className="answerAndCursor Answer cursor">
                    {displayAnswer}
                    {/* <span className="blinkingCursor">&#9646;</span> */}
                  </div>
                  {showImg && image && <img src={image} alt="Answer Image" />}
                </div>
              </div>
            )}
          </div>
        </>
      )}
      <div className="input-container">
        <form onSubmit={handleSubmit} className="bottomDiv">
          <input
            type="text"
            value={typed}
            onChange={handleChange}
            className="inputBox"
            autoFocus
          />
          <Button
            type="submit"
            variant="secondary"
            className="SubmitPDFButton"
            disabled={!typed.trim()}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
