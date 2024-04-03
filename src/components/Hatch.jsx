import { Card } from "react-bootstrap";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

function Hatch({ number }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Card
        onClick={handleShow}
        style={{
          border: "1px solid black",
          width: "80%",
          height: "80%",
          backgroundColor: "#cbd6d5",
        }}
      >
        <div className="hatch">{number}</div>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hatch X</Modal.Title>
        </Modal.Header>
        <Modal.Body>Welcome to hatch X!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Hatch;
