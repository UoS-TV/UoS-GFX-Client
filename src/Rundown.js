import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import TemplateItem from "./items/TemplateItem";
import MediaItem from "./items/MediaItem";
import ScorerItem from "./items/ScorerItem";

const Rundown = () => {
  const [items, setItems] = useState([{ id: 1, type: "Template" }]);

  const addItem = (type) => {
    const newItem = {
      id: items.length + 1,
      type: type,
    };

    setItems([...items, newItem]);
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

  return (
    <Container>
      <Row>
        {items.map((item) => (
          <div key={item.id}>
            {item.type === "Template" && (
              <TemplateItem
                {...item}
                onRemove={() => removeItem(item.id)}
                onMoveUp={() => moveItemUp(item.id)}
                onMoveDown={() => moveItemDown(item.id)}
                title={`${item.type} Item`}
              />
            )}
            {item.type === "Media" && (
              <MediaItem
                {...item}
                onRemove={() => removeItem(item.id)}
                onMoveUp={() => moveItemUp(item.id)}
                onMoveDown={() => moveItemDown(item.id)}
                title={`${item.type} Item`}
              />
            )}
            {item.type === "Scorer" && (
              <ScorerItem
                {...item}
                onRemove={() => removeItem(item.id)}
                onMoveUp={() => moveItemUp(item.id)}
                onMoveDown={() => moveItemDown(item.id)}
                title={`${item.type} Item`}
              />
            )}
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
      </ButtonGroup>
    </Container>
  );
};

export default Rundown;
