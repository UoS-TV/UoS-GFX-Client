import React from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

const Footer = () => {
  return (
    <footer className="footer">
        <Container>
          <Row>
            <Form
              onSubmit={(event) => {
                event.preventDefault();
              //   contexts.itemActions.custom(event.target.command.value);
              }}
            >
              <InputGroup>
                <FloatingLabel
                  controlId="floatingInput"
                  // label={"SERVER RESPONSE: " + "server response here"}
                >
                  <Form.Control
                    name="command"
                    defaultValue="hello"
                  />
                </FloatingLabel>
                <Button variant="warning" type="submit">
                  Send Command
                </Button>
                    <Button
                      variant="secondary"
                    >
                      CLEAR CH.
                    </Button>
                <Button
                  variant="dark"
                >
                  CLEAR ALL
                </Button>
              </InputGroup>
            </Form>
          </Row>
        </Container>
    </footer>
  );
};

export default Footer;
