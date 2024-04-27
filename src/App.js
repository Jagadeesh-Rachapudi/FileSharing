import Button from "react-bootstrap/Button";
import { useState } from "react";
import "./App.scss";
import Chat from "./Chat/Chat.jsx";

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [disableButton, setDisableButton] = useState(true);
  const [chatPage, setChatPage] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (pdfFile) {
      try {
        const formData = new FormData();
        formData.append("pdfFile", pdfFile);
        const response = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formData
        });
        if (response.ok) {
          console.log("File uploaded successfully");
          setChatPage(true);
        } else {
          console.error("Failed to upload file");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.log("No file selected");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);
    setDisableButton(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        {chatPage ? (
          <>
            <Chat />
          </>
        ) : (
          <form onSubmit={handleSubmit} className="formContainer">
            <h1 className="title">Submit PDF</h1>
            <input
              className="pdfFile"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />
            <Button
              variant="secondary"
              className="SubmitPDFButton"
              disabled={disableButton}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </form>
        )}
      </header>
    </div>
  );
}

export default App;
