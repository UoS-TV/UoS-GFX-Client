import React, { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import Files from "react-files";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import { UserContext } from "./context";
import CustomRundownButtons from "./old/RundownButtons";
import GFXItem from "./GFXItem";

let fileReader = new FileReader();

const CustomColumn = () => {
  const contexts = useContext(UserContext);

  const [items, setItems] = useState([]);
  const [filename, setFilename] = useState("");

  const removeItem = (id) => {
    console.table(items);
    console.log("Removing Item: ", id);
    let _items = [...items];

    _items = _items.filter((item) => item.id !== id);
    console.log(_items);
    setItems(_items);
  };

  var itemData = {
    id: uuidv4(),
    type: "Template",
    delItem: removeItem,
    templates: contexts.templates,
    template: "UoS-GFX-Package/l3rd-dynamic",
    channel: contexts.defaultChannel,
    layer: contexts.defaultLayer,
    dyTags: [
      {
        dyID: "",
        dyData: "",
        id: uuidv4(),
      },
      {
        dyID: "",
        dyData: "",
        id: uuidv4(),
      },
    ],
  };
  var itemScoreData = {
    id: uuidv4(),
    type: "Score",
    delItem: removeItem,
    templates: contexts.templates,
    template: "UoS-GFX-Package/scorebug",
    channel: contexts.defaultChannel,
    layer: contexts.defaultLayer,
    dyTags: [],
  };

  const addItems = {
    templateItem: () => {
      let _items = [...items];
      _items.push(itemData);
      setItems(_items);
    },
    scoreItem: () => {
      let _items = [...items];
      _items.push(itemScoreData);
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
    loadRundownData: (file) => {
      console.log("Function to load rundown from local storage");
      // fileReader.readAsText(file[0]);
    },
  };

  fileReader.onload = (event) => {
    console.log(event.target.result);
    setItems(JSON.parse(event.target.result));
  };

  return (
    <div className="my-4">
      <Form onSubmit={rundownFunctions.saveRundownData}>
        <InputGroup className="d-flex">
          <Button variant="info">
            <Files
              className="files-dropzone"
              onChange={(file) => {
                fileReader.readAsText(file[0]);
              }}
              onError={(err) => console.log(err)}
              accepts={[".json"]}
              multiple
              maxFiles={3}
              maxFileSize={10000000}
              minFileSize={0}
              clickable
            >
              Load Rundown
            </Files>
          </Button>

          <Form.Control
            type="text"
            placeholder="Custom Rundown Name"
            onChange={rundownFunctions.setRundownName}
          />
          <Button variant="primary" type="submit">
            Save Rundown
          </Button>
        </InputGroup>
      </Form>
      <div className="my-4">
        {items.map((item) => (
          <GFXItem data={item} title={item.type + " Item"} />
        ))}
      </div>
      <ButtonGroup className="d-flex float-end">
        <Button variant="outline-success" onClick={addItems.templateItem}>
          Add Template Item
        </Button>
        <Button variant="outline-success">Add Media Item (Future)</Button>
        <Button variant="outline-success" onClick={addItems.scoreItem}>
          Add Scorebug Item
        </Button>
      </ButtonGroup>
      <div className="files"></div>
    </div>
  );
};

export default CustomColumn;
