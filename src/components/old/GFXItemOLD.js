import { useContext, useState } from "react";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";

import { BorderCard } from "../RundownColumn";

import CGButtons from "../CGButtons"

import { UserContext } from "../context.jsx";

var getFilename = function (str) {
  return str.split("\\").pop().split("/").pop();
};

var getFolder = function (str) {
  return str.split("/").slice(0, -1).join("/");
};

const GFXItem = ({ data, dyTags, selected, onChange }) => {
  const contexts = useContext(UserContext);

  const [channel, setChannel] = useState(contexts.defaultChannel);
  const [layer, setLayer] = useState(contexts.defaultLayer);

  return (
    <>
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
                min="1"
                max={contexts.channelMax}
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
            <CGButtons data={[channel, layer, data.gfxtemplate, data.gfxpayload]}/>
          </InputGroup>
        </Card.Footer>
      </BorderCard>
    </>
  );
};

export default GFXItem;
