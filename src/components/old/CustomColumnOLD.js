import React, { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";

import {
  BsTrashFill,
} from "react-icons/bs";
import { UserContext } from "../context";
import CustomRundownButtons from "../RundownButtons";
import CGButtons from "../CGButtons";

const CustomColumn = () => {
  const contexts = useContext(UserContext);

  const [filename, setFilename] = useState("");

  const [items, setItems] = useState([
    {
      id: uuidv4(),
      template: "",
      channel: contexts.defaultChannel,
      layer: contexts.defaultLayer,
      dyTags: [
        {
          dyID: "",
          dyData: "",
          id: uuidv4(),
        },
      ],
    },
  ]);

  const addNewDyTagField = (id) => {
    const index = items.findIndex((template) => template.id === id);
    let _items = [...items];
    _items[index].dyTags.push({
      dyID: "",
      dyData: "",
      id: uuidv4(),
    });
    setItems(_items);
  };

  const removeDyField = (id, test) => {
    const index = items.findIndex((template) => template.id === id);
    let _items = [...items];
    _items[index].dyTags.splice(test, 1);
    setItems(_items);
  };

  const handleItemData = (id, event) => {
    const index = items.findIndex((template) => template.id === id);

    let _items = [...items];

    _items[index][event.target.name] = event.target.value;
    setItems(_items);
  };
  //handle inner member data in team
  const handleDyTaginItem = (itemID, dyTagID, event) => {
    const itemIndex = items.findIndex((template) => template.id === itemID);
    let _items = [...items];
    const memberIndex = items[itemIndex].dyTags.findIndex(
      (m) => m.id === dyTagID
    );
    _items[itemIndex].dyTags[memberIndex][event.target.name] =
      event.target.value;
    setItems(_items);
  };

  const addItems = {
    handleAddTemplate: () => {
      console.log("hi sam");
      let _items = [...items];
      _items.push({
        id: uuidv4(),
        template: "",
        channel: contexts.defaultChannel,
        layer: contexts.defaultLayer,
        dyTags: [
          {
            dyID: "",
            dyData: "",
            id: uuidv4(),
          },
        ],
      });
      setItems(_items);
    },
  };

  const rundownFunctions = {
    setRundownName: (e) => {
      setFilename(e.target.value);
      console.log(filename);
    },
    saveRundownData: () => {
      console.table(items);
      contexts.handleSave(items, filename);
    },
    loadRundownData: () => {
      console.log("Function to load rundown from local storage");
    },
  };

  return (
    <div className="my-4">
      <CustomRundownButtons functions={rundownFunctions} />
      {items.map((template) => (
        <Card className="row-section__inner mb-3" key={template.id}>
          <Card.Header
            as="h5"
            className="d-flex justify-content-between align-items-center"
          >
            Template
            {/* {template.id} */}
            <Button variant="outline-danger">Delete Item</Button>
          </Card.Header>
          <Card.Body>
            <InputGroup className="mb-3">
              <Form.Select
                className="sm-7 templateSelect"
                placeholder="Template"
              />
              <FloatingLabel controlId="floatingInput" label="Channel">
                <Form.Control
                  type="number"
                  name="channel"
                  min="1"
                  max={contexts.channelMax}
                  defaultValue={contexts.defaultChannel}
                  onChange={(e) => handleItemData(template.id, e)}
                />
              </FloatingLabel>
              <InputGroup.Text>-</InputGroup.Text>
              <FloatingLabel controlId="floatingInput" label="Layer">
                <Form.Control
                  type="number"
                  min="1"
                  defaultValue={contexts.defaultLayer}
                />
              </FloatingLabel>
            </InputGroup>
            {template.dyTags.map((dyTag) => (
              <div className="my-2" key={dyTag.id}>
                <InputGroup>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Dynamic ID Tag (e.g. f0)"
                  >
                    <Form.Control
                      name="dyID"
                      type="text"
                      placeholder="f0"
                      onChange={(e) =>
                        handleDyTaginItem(template.id, dyTag.id, e)
                      }
                    />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingInput" label="Data">
                    <Form.Control
                      name="dyData"
                      type="text"
                      placeholder="Data"
                      onChange={(e) =>
                        handleDyTaginItem(template.id, dyTag.id, e)
                      }
                    />
                  </FloatingLabel>
                  <Button
                    variant="outline-danger"
                    onClick={() => removeDyField(template.id, dyTag.id)}
                  >
                    <BsTrashFill />
                  </Button>
                </InputGroup>
              </div>
            ))}
            <Button
              variant="outline-success"
              size="sm"
              className="float-end"
              onClick={() => addNewDyTagField(template.id)}
            >
              Add Dynamic Field
            </Button>
          </Card.Body>
          <Card.Footer className="text-muted">
            <ButtonGroup className="d-flex w-100">
              <CGButtons data={["fill me with data!!"]}/>
            </ButtonGroup>
          </Card.Footer>
        </Card>
      ))}
      <ButtonGroup>
        <Button variant="outline-success" onClick={addItems.handleAddTemplate}>
          Add Template Item
        </Button>
        <Button variant="outline-success">Add Media Item</Button>
        <Button variant="outline-success">Add Scorebug Item</Button>
      </ButtonGroup>
    </div>
  );
};

export default CustomColumn;
