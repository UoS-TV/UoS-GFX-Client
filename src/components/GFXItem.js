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
import { BorderCard } from "./RundownColumn";

var getFilename = function (str) {
  return str.split("\\").pop().split("/").pop();
};

var getFolder = function (str) {
  return str.split("/").slice(0, -1).join("/");
};

const GFXItem = ({ data, dyTags, selected, onChange }) => {
  const ManagePayload = function () {
    return data.gfxtemplate + data.gfxpayload;
  };

  const [channel, setChannel] = useState(1);
  const [layer, setLayer] = useState(20);

  const GFXPlay = function (payload) {
    const cgCommand =
      "PLAY " + channel + "-" + layer + " " + ManagePayload(payload);
    console.log(cgCommand);
    console.log(dyTags);
  };

  // Received message from 127.0.0.1: CG 1-20 ADD 1 "UOS-GFX-PACKAGE/L3RD-DYNAMIC" 1 "{\"f0\":\"this is f0\",\"f1\":\"this is f1\"}"\r\n

  return (
    <BorderCard
      className="row-section__inner mb-3"
      selected={selected}
      onClick={onChange}
    >
      <Card.Header
        as="h5"
        className="d-flex justify-content-between align-items-center"
      >
        {data.StorySlug}
      </Card.Header>
      <Card.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon3">
            {getFolder(data.gfxtemplate)}
          </InputGroup.Text>
          <Form.Control
            className="templateSelect"
            type="text"
            value={getFilename(data.gfxtemplate)}
            readOnly
          />
        </InputGroup>

        {dyTags.map((dyTag, index) => {
          return (
            <div className="my-2">
              <InputGroup>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Dynamic ID Tag (e.g. f0)"
                >
                  <Form.Control
                    readOnly
                    name="dyID"
                    type="text"
                    placeholder="f0"
                    value={dyTag.dyTagID}
                  />
                </FloatingLabel>
                <FloatingLabel controlId="floatingInput" label="Data">
                  <Form.Control
                    name="dyData"
                    type="text"
                    placeholder="Data"
                    value={dyTag.dyTagData}
                  />
                </FloatingLabel>
              </InputGroup>
            </div>
          );
        })}
      </Card.Body>
      <Card.Footer className="text-muted">
        <InputGroup className="w-100">
          <FloatingLabel controlId="floatingInput" label="Channel">
            <Form.Control
              type="number"
              name="channel"
              defaultValue={channel}
              onChange={(e) => {
                setChannel(e.target.value);
              }}
            />
          </FloatingLabel>
          <InputGroup.Text>-</InputGroup.Text>
          <FloatingLabel controlId="floatingInput" label="Layer">
            <Form.Control
              type="number"
              defaultValue={layer}
              onChange={(e) => {
                setLayer(e.target.value);
              }}
            />
          </FloatingLabel>
          <Button variant="success" onClick={GFXPlay}>
            <BsPlayFill /> Play
          </Button>
          <Button variant="info">
            <BsSkipEndFill /> Next
          </Button>
          <Button variant="danger">
            <BsStopFill /> Stop
          </Button>
        </InputGroup>
      </Card.Footer>
    </BorderCard>
  );
};

export default GFXItem;
