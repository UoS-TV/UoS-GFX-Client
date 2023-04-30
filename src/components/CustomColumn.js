import React, { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { UserContext } from "./context";
import CustomRundownButtons from "./RundownButtons";
import GFXItem from "./GFXItem";

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
    item: "",
    delItem: removeItem,
    templates: contexts.templates,
    template: "UoS-GFX-Package/clock-time-big",
    channel: contexts.defaultChannel,
    layer: contexts.defaultLayer,
    dyTags: [
      {
        dyID: "f0",
        dyData: "",
        id: uuidv4(),
      },
      {
        dyID: "f1",
        dyData: "",
        id: uuidv4(),
      },
    ],
  };

  const addItems = {
    handleAddItem: () => {
      let _items = [...items];
      _items.push(itemData);
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
      <div className="my-4">
        {items.map((item) => (
          <GFXItem data={item} title={item.type + " Item"} />
        ))}
      </div>
      <ButtonGroup className="d-flex">
        <Button variant="outline-success" onClick={addItems.handleAddItem}>
          Add Template Item
        </Button>
        {/* <Button variant="outline-success">Add Media Item (Future)</Button>
        <Button variant="outline-success">Add Scorebug Item (Future)</Button> */}
        <Button
          variant="outline-secondary"
          onClick={() => contexts.getItems("templates")}
        >
          Refresh Templates
        </Button>
        <Button
          variant="outline-secondary"
          onClick={() => contexts.getItems("media")}
        >
          Refresh Media
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default CustomColumn;
