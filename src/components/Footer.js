import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

const Footer = ({ casparCommands, casparResponse }) => {
  const channels = 2;

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              casparCommands.custom(e.target.command.value);
            }}
          >
            <InputGroup className="mb-2">
              {/* <FloatingLabel label="Custom Command"> */}
                <Form.Control name="command" placeholder="Custom Command"/>
              {/* </FloatingLabel> */}
              <Button variant="primary" type="submit">
                Send Command
              </Button>
              {[...Array(channels)].map((e, i) => {
                return (
                  <Button
                    key={i}
                    variant="warning"
                    onClick={() => casparCommands.custom("CLEAR " + (i + 1))}
                  >
                    CLEAR CH. {i + 1}
                  </Button>
                );
              })}
              <Button
                variant="danger"
                onClick={() => {
                  [...Array(channels)].map((e, i) => {
                    casparCommands.custom("CLEAR " + (i + 1));
                  });
                }}
              >
                CLEAR ALL
              </Button>
            </InputGroup>
          </Form>
        </Row>
        Last Sent: {casparCommands.sent} | Response: {casparCommands.response}
      </Container>
    </footer>
  );
};

export default Footer;
