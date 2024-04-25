import React, { useState } from "react";
import "./Form.scss";
import Button from "react-bootstrap/Button";

const Chat = () => {
  const [question, setQuestion] = useState("");
  const [typed, setTyped] = useState("");
  const [answer, setAnswer] = useState("");

  const handleChange = (e) => {
    setTyped(e.target.value);
    // console.log(typed);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (typed.trim() !== "") {
      try {
        const capitalizedQuestion =
          typed.charAt(0).toUpperCase() + typed.slice(1);
        // console.log(capitalizedQuestion);
        const response = await fetch("http://localhost:5000/answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: capitalizedQuestion }),
        });

        if (response.ok) {
          const responseData = await response.json();
          setAnswer(responseData.answer);
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
      <div className="chatcontainer">
        {question && (
          <div>
            <h2>{question}</h2>
            <p className="Answer">{answer}</p>
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
