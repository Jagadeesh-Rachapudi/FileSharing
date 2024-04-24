import logo from './logo.svg';
import './App.css';
import SampleComponent from './chat/chat';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';


function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [disableButton, setDisableButton] = useState(true);

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (pdfFile) {
        try {
          const formData = new FormData();
          formData.append('pdfFile', pdfFile);
          const response = await fetch('http://10.8.82.221:5000/upload', {
            method: 'POST',
            body: formData,
          });
    
          if (response.ok) {
            console.log('File uploaded successfully');
          } else {
            console.error('Failed to upload file');
          }
        } catch (error) {
          console.error('Error uploading file:', error);
        
        }
      } else {
        console.log('No file selected');
        
      }
    };    
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);
    setDisableButton(false)
  };
  
  return (
    <div className="App">
      <header className="App-header">
      <form onSubmit={handleSubmit}>
        <div className='Heading' >Submit PDF</div>
        <input id="pdfFile" className="pdfForm" type="file" accept="application/pdf" onChange={handleFileChange} />
        <Button variant="secondary" className='SubmitPDFButton' disabled={disableButton} onClick={handleSubmit} >Submit</Button>  
      </form>
      </header>
    </div>
  );
}

export default App;
