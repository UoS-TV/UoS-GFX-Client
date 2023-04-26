import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import { UserContext } from "./context.jsx";
import { useContext } from "react";

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

function Footer(props) {
  const action = useContext(UserContext).actions;

  return (
    <div>
      <div style={phantomStyle} />
      <div style={footerStyle}>
        <Container>
          <Row>
            <Form
              onSubmit={(event) => {
                event.preventDefault();
                action.play(event.target.command.value);
              }}
            >
              <InputGroup>
                <FloatingLabel
                  controlId="floatingInput"
                  label={"last command: " + props.value}
                >
                  <Form.Control name="command" />
                </FloatingLabel>
                <Button variant="warning" type="submit">
                  Send Command
                </Button>
                {[...Array(props.channels)].map((e, value) => {
                  return (
                    <Button
                      key={value}
                      variant="secondary"
                      onClick={() => action.custom("CLEAR " + (value + 1))}
                    >
                      CLEAR CH. {value + 1}
                    </Button>
                  );
                })}
                <Button
                  variant="dark"
                  onClick={() => action.custom("CLEAR ALL")}
                >
                  CLEAR ALL
                </Button>
              </InputGroup>
            </Form>
          </Row>
        </Container>
      </div>
    </div>
  );
}
export default Footer;
