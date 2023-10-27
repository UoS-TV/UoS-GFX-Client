import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import LoadRundownModal from "./LoadRundownModal";

import ItemContainer from "./items/ItemContainer";

const Rundown = ({ casparCommands }) => {
  const [rundownId, setRundownId] = useState(uuidv4());
  const [rundownName, setRundownName] = useState("");
  const [items, setItems] = useState([]);
  const [loadedRundowns, setLoadedRundowns] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const addItem = (type) => {
    const newItem = {
      id: uuidv4(),
      type: type,
      title: type + " Item",
      selectedSource: "",
      channel: 1,
      layer: 20,
      tags: [
        { id: "f0", text: "" },
        { id: "f1", text: "" },
      ],
    };
    setItems([...items, newItem]);
  };

  const updateItem = (itemId, updatedItem) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, ...updatedItem };
      }
      return item;
    });

    setItems(updatedItems);
  };

  const removeItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const moveItemUp = (id) => {
    const index = items.findIndex((item) => item.id === id);
    if (index > 0) {
      const updatedItems = [...items];
      [updatedItems[index], updatedItems[index - 1]] = [
        updatedItems[index - 1],
        updatedItems[index],
      ];
      setItems(updatedItems);
    }
  };

  const moveItemDown = (id) => {
    const index = items.findIndex((item) => item.id === id);
    if (index < items.length - 1) {
      const updatedItems = [...items];
      [updatedItems[index], updatedItems[index + 1]] = [
        updatedItems[index + 1],
        updatedItems[index],
      ];
      setItems(updatedItems);
    }
  };

  const listRundowns = () => {
    Axios.get("http://localhost:3002/list-rundowns")
      .then((response) => {
        setLoadedRundowns(response.data); // Assuming the response data is an array of rundowns
      })
      .catch((error) => {
        console.error("Error loading rundowns:", error);
      });
  };

  // Function to open the modal
  const openModal = () => {
    setModalIsOpen(true);
    listRundowns();
  };

  // Function to close the modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleLoadRundown = (rundown) => {
    // Make a request to load the selected rundown here
    Axios.post("http://localhost:3002/load-rundown", {
      rundownid: rundown.id,
    })
      .then((response) => {
        const loadedRundownData = response.data.data;
        // Update your state or take other actions to load the data.
        console.log("Rundown loaded successfully", loadedRundownData);
        setItems(loadedRundownData.items);
        setRundownName(loadedRundownData.rundownName);
      })
      .catch((error) => {
        console.error("Error loading rundown:", error);
        alert("Error loading rundown:", error);
      });
  };

  const saveRundown = () => {
    const dataToSave = {
      id: rundownId,
      rundownName,
      items,
    };

    Axios.post("http://localhost:3002/rundown", dataToSave)
      .then((response) => {
        console.log("Rundown saved successfully", response.data);
      })
      .catch((error) => {
        console.error("Error saving rundown:", error);
      });
  };

  return (
    <Container>
      <InputGroup className="mb-3">
        {/* Button to open the modal */}
        <Button 
        variant="secondary"
        onClick={openModal}>Load Rundown</Button>

        {/* Modal to select and load a rundown */}
        <LoadRundownModal
          show={modalIsOpen}
          rundowns={loadedRundowns}
          onClose={closeModal}
          onRundownLoad={handleLoadRundown}
          listRundowns={listRundowns}
        />
        <Form.Control
          placeholder="Rundown Name"
          value={rundownName}
          onChange={(e) => {
            setRundownName(e.target.value);
          }}
        />
        <Button variant="primary" onClick={saveRundown}>
          Save Rundown
        </Button>
      </InputGroup>
      <Row>
        {items.map((item) => (
          <div key={item.id} onClick={() => setSelectedItem(item)}>
            <ItemContainer
              selectedItem={item === selectedItem}
              item={item}
              updateItem={updateItem}
              onRemove={() => removeItem(item.id)}
              onMoveUp={() => moveItemUp(item.id)}
              onMoveDown={() => moveItemDown(item.id)}
              casparCommands={casparCommands}
            />
          </div>
        ))}
      </Row>
      <ButtonGroup className="mb-3">
        <Button variant="outline-primary" onClick={() => addItem("Template")}>
          Add Template
        </Button>
        <Button variant="outline-primary" onClick={() => addItem("Media")}>
          Add Media
        </Button>
        <Button variant="outline-primary" onClick={() => addItem("Scorer")}>
          Add Scorer
        </Button>
        {/* <Button variant="dark" onClick={() => console.table(items)}>
          Console Log Items
        </Button> */}
      </ButtonGroup>
    </Container>
  );
};

export default Rundown;
