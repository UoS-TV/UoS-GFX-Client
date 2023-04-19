import { useState } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";

import {
  BsPlayFill,
  BsSkipEndFill,
  BsArrowClockwise,
  BsStopFill,
} from "react-icons/bs";

var getFilename = function (str) {
  return str.split("\\").pop().split("/").pop();
};

var getFolder = function (str) {
  return str.split("/").slice(0, -1).join("/");
};

const GFXItem = (props) => {
  const row = props.data;
  const sel = props.selected;
  console.log(props, row);

  const [check, setcheck] = useState('');

  return (
    <Card 
    // border={check === sel ? 'blue' : null}
    // onClick={() => {setcheck(row.RowID);console.log(check);} }
    className="row-section__inner mb-3"
    >
      <Card.Header
        as="h5"
        className="d-flex justify-content-between align-items-center"
      >
        {row.StorySlug}
      </Card.Header>
      <Card.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon3">
            {getFolder(row.gfxtemplate)}
          </InputGroup.Text>
          <Form.Control
            className="templateSelect"
            type="text"
            value={getFilename(row.gfxtemplate)}
            readOnly
          />
        </InputGroup>
        {row.gfxpayload}
      </Card.Body>
      <Card.Footer className="text-muted">
        <InputGroup className="w-100">
          <FloatingLabel controlId="floatingInput" label="Channel">
            <Form.Control
              type="number"
              name="channel"
              placeholder="1"
              defaultValue="1"
              // onChange={(e) => handleTeamData(template.id, e)}
            />
          </FloatingLabel>
          <InputGroup.Text>-</InputGroup.Text>
          <FloatingLabel controlId="floatingInput" label="Layer">
            <Form.Control type="number" placeholder="20" defaultValue="20" />
          </FloatingLabel>
          {/* </InputGroup> */}
          <Button variant="success">
            <BsPlayFill /> Play
          </Button>
          <Button variant="primary">
            <BsSkipEndFill /> Next
          </Button>
          <Button variant="dark">
            <BsStopFill /> Stop
          </Button>
        </InputGroup>
      </Card.Footer>
    </Card>
  );
};

export default GFXItem;
