import React, { useState, useRef, useEffect } from "react";
import "./Chat.scss";
import Button from "react-bootstrap/Button";

const Chat = () => {
  const [question, setQuestion] = useState("");
  const [typed, setTyped] = useState("");
  const [answer, setAnswer] = useState("");
  const [displayAnswer, setDisplayAnswer] = useState("");
  const [image, setImage] = useState("");
  const [showImg, setShowImg] = useState(false);
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

    const updateDisplayAnswer = () => {
      if (index < words.length) {
        const trimmedWord = words[index].trim();
        setDisplayAnswer((prevDisplayAnswer) => {
          if (index === 0) {
            return trimmedWord;
          } else {
            return prevDisplayAnswer + " " + trimmedWord;
          }
        });
        index++;
        const randomDelay = Math.random() * (500 - 100) + 100;
        setTimeout(updateDisplayAnswer, randomDelay);
        setShowImg(false);
      } else {
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
      <div className="chatcontainer" ref={chatContainerRef}>
        {question && (
          <div>
            <h2>{question}</h2>
            <div className="answerContainer">
              <p className="Answer cursor">{displayAnswer} &#9646;</p>
              {showImg && image && <img src={image} alt="Answer Image" />}
            </div>
          </div>
        )}
      </div>
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
