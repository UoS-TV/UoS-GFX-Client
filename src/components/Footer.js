import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
// import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const footerStyle = {
  backgroundColor: "#ececec",
  textAlign: "center",
display: "flex",
alignItems: "center",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "15vh",
  width: "100%",
};

const phantomStyle = {
  height: "15vh",
  width: "100%",
};

function Footer() {
  return (
    <div>
      <div style={phantomStyle} />
      <div style={footerStyle}>
        <Container>
          <Row>
            {/* <Col sm={8}> */}
              <InputGroup>
                <Form.Control placeholder="CasparCG Command" />
                <Button variant="warning">Send Command</Button>
              </InputGroup>
            {/* </Col> */}
            {/* <Col sm={4}>
              <ButtonGroup className="">
                <Button variant="primary">Save Rundown</Button>
                <Button variant="info">Load Rundown</Button>
              </ButtonGroup>
            </Col> */}
          </Row>
        </Container>
      </div>
    </div>
  );
}
export default Footer;
