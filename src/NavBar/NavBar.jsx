import "./NavBar.scss";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { GiHamburgerMenu } from "react-icons/gi";
import requestUpdatation from "../Redux/Questions";
import { connect } from "react-redux";
function NavBar(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(props.questions);
  return (
    <div className="canvasDivTag">
      <Button
        variant="outline"
        onClick={handleShow}
        className="NavBarBurgermenu"
      >
        <GiHamburgerMenu size={25} />
      </Button>

      <Offcanvas show={show} onHide={handleClose} className="canvasBody">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <div className="topHedding">
              {" "}
              <img
                className="logo"
                src="https://firebasestorage.googleapis.com/v0/b/peronal-stuff-61ac6.appspot.com/o/Hacketon%2Fyamaha_logo_blue.jpg?alt=media&token=126f44af-b10d-4711-9dbb-8ede297230ff"
              />{" "}
              <h3>Recent Questions</h3>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="canvasBody">
            {props.questions.map((question) => (
              <div key={question.index} className="QandA">
                <div className="question">{question.question}</div>
                <div className="answer">{question.answer}</div>
              </div>
            ))}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { questions: state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestUpdatation: () => dispatch(requestUpdatation())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
