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
    <>
      <Button variant="outline" onClick={handleShow}>
        <GiHamburgerMenu size={25} />
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul>
            {props.questions.map((question) => (
              <li key={question.index}>{question.question}</li>
            ))}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
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
