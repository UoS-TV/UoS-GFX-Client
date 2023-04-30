import { useContext, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import { BsTrashFill } from "react-icons/bs";

import CGButtons from "./CGButtons";

import { UserContext } from "./context.jsx";

const GFXItem = (props) => {
  const contexts = useContext(UserContext);

  // const [itemTitle, setItemTitle] = useState("Template")
  const [channel, setChannel] = useState(props.data.channel);
  const [layer, setLayer] = useState(props.data.layer);
  const [template, setTemplate] = useState("");
  const [dyTags, setDyTags] = useState(props.data.dyTags);
  var isAPI = false;
  if (props.data.type === "API") {
    isAPI = true;
  }

  const handleAddDyField = () => {
    let _dyTags = [...dyTags];
    _dyTags.push(props.data.dyTags);
    setDyTags(_dyTags);
  };

  const handleRemoveDyField = (id) => {
    console.log("removing", id);
    let _dyTags = [...dyTags];
    _dyTags.splice(id, 1);
    setDyTags(_dyTags);
  };

  const DeleteItemButton = () => {
    if (!isAPI) {
      return (
        <Button
          variant="outline-danger"
          onClick={() => props.data.delItem(props.data.id)}
        >
          Delete Item
        </Button>
      );
    }
  };

  const RemoveDyFieldButton = ({ id }) => {
    {
      if (!isAPI) {
        return (
          <Button
            variant="outline-danger"
            onClick={() => handleRemoveDyField(id)}
          >
            <BsTrashFill />
          </Button>
        );
      }
    }
  };

  const AddDyFieldButton = () => {
    {
      if (!isAPI) {
        return (
          <Button
            variant="outline-success"
            size="sm"
            className="float-end"
            onClick={handleAddDyField}
          >
            Add Dynamic Field
          </Button>
        );
      }
    }
  };

  return (
    <>
      <Card className="my-2">
        <Card.Header
          as="h5"
          className="d-flex justify-content-between align-items-center"
        >
          {props.title}
          <DeleteItemButton />
        </Card.Header>
        <Card.Body>
          <Form.Select
            onChange={(e) => setTemplate(e.target.value)}
            readOnly={isAPI} // if it's a api template make it readOnly
          >
            <option>Select Template</option>
            {contexts.items.templates.map((template) => (
              <option key={template} value={template}>
                {template}
              </option>
            ))}
          </Form.Select>
          {dyTags.map((dyTag) => (
            <div className="my-2" key={dyTag.id}>
              <InputGroup>
                {/* <InputGroup.Text>{dyTag.id}</InputGroup.Text> */}
                <FloatingLabel
                  controlId="floatingInput"
                  label="Dynamic ID Tag (e.g. f0)"
                >
                  <Form.Control
                    name="dyID"
                    type="text"
                    defaultValue={dyTag.dyID}
                    readOnly={isAPI}
                    onChange={(e) => (dyTag.dyID = e.target.value)}
                  />
                </FloatingLabel>
                <FloatingLabel controlId="floatingInput" label="Data">
                  <Form.Control
                    name="dyData"
                    type="text"
                    defaultValue={dyTag.dyData}
                    readOnly={isAPI}
                    onChange={(e) => (dyTag.dyData = e.target.value)}
                  />
                </FloatingLabel>
                <RemoveDyFieldButton id={dyTag.id} />
              </InputGroup>
            </div>
          ))}
          <Button size="sm" onClick={() => console.table(dyTags)}>
            Log dyTags
          </Button>
          <AddDyFieldButton />
        </Card.Body>
        <Card.Footer className="text-muted d-flex justify-content-between align-items-center">
          Item ID: {props.data.id}
          <InputGroup className="w-50">
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
            <CGButtons data={{ channel, layer, template, dyTags }} />
          </InputGroup>
        </Card.Footer>
      </Card>
    </>
  );
};

export default GFXItem;
