import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import React, { useState } from "react";

import { BsFillGearFill } from "react-icons/bs";
import ConfigModal from "./old/ConfigModal";

function Header() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">UoS Caspar Client</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* <Nav className="me-auto"> */}
          {/* <Nav.Link href="/">Home</Nav.Link> */}
          {/* <Nav.Link href="/RundownSelector">Rundown Selector</Nav.Link> */}
          {/* </Nav> */}
        </Navbar.Collapse>
        <BsFillGearFill variant="primary" onClick={handleShow} />
        <ConfigModal isModalVisible={show} handleShow={() => setShow(false)} />
      </Container>
    </Navbar>
  );
}

export default Header;
