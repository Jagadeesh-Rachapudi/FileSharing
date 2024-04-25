import React, { useState } from "react";
import "./Form.scss";
import Button from "react-bootstrap/Button";

const Chat = () => {
  const [question, setQuestion] = useState("");
  const [typed, setTyped] = useState("");
  const [answer, setAnswer] = useState("");

  const handleChange = (e) => {
    setTyped(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typed.trim() !== "") {
      const capitalizedQuestion =
        typed.charAt(0).toUpperCase() + typed.slice(1);
      setQuestion(capitalizedQuestion);
      setAnswer("max is the max at maximum");
      setTyped("");
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
