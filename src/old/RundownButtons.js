import React from "react";

import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const CustomRundownButtons = (props) => {
  const handleRundownSave = (e) => {
    e.preventDefault();
    props.functions.saveRundownData();
  };

  return (
    <Form onSubmit={handleRundownSave}>
      <InputGroup className="d-flex">
        <Button variant="info" onClick={props.functions.loadRundownData}>
          Load Rundown
        </Button>
        <Form.Control
          type="text"
          placeholder="Custom Rundown Name"
          onChange={props.functions.setRundownName}
        />
        <Button variant="primary" type="submit">
          Save Rundown
        </Button>
      </InputGroup>
    </Form>
  );
};

export default CustomRundownButtons;
