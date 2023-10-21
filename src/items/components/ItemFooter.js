import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import { Trash, CaretUpFill, CaretDownFill } from "react-bootstrap-icons"; // Import the Trash, CaretUpFill, and CaretDownFill icons



const ItemFooter = ({
  // onPlay,
  // onNext,
  // onUpdate,
  // onStop,
  onRemove,
  onMoveUp,
  onMoveDown,
  selectedTemplate,
  channel,
  layer,
  dynamicTags
}) => {


  
  const onPlay = () => {
    const payload = {
      template: selectedTemplate,
      channel,
      layer,
      dynamicTags,
      // ...other relevant data
    };
  
    // Send the payload to your CasparCG server
    // ...
    console.log("PLAY", payload)
  };

  const onNext = () => {
    const payload = {
      template: selectedTemplate,
      channel,
      layer,
      dynamicTags,
      // ...other relevant data
    };
  
    // Send the payload to your CasparCG server
    // ...
    console.log("NEXT", payload)
  };

  const onUpdate = () => {
    const payload = {
      template: selectedTemplate,
      channel,
      layer,
      dynamicTags,
      // ...other relevant data
    };
  
    // Send the payload to your CasparCG server
    // ...
    console.log(payload)
  };
  const onStop = () => {
    const payload = {
      template: selectedTemplate,
      channel,
      layer,
      dynamicTags,
      // ...other relevant data
    };
  
    // Send the payload to your CasparCG server
    // ...
    console.log(payload)
  };

  return (
    <Card.Footer className="d-flex justify-content-between align-items-center">
      <Button
        variant="danger"
        onClick={onRemove}
      >
        <Trash />
      </Button>
        <ButtonGroup>
          <Button variant="secondary" onClick={onMoveUp}>
            <CaretUpFill />
          </Button>
          <Button variant="secondary" onClick={onMoveDown}>
            <CaretDownFill />
          </Button>
        </ButtonGroup>
      <ButtonGroup>
        <Button variant="success" onClick={onPlay}>
          Play
        </Button>
        <Button variant="primary" onClick={onNext}>
          Next
        </Button>
        <Button variant="info" onClick={onUpdate}>
          Update
        </Button>
        <Button variant="warning" onClick={onStop}>
          Stop
        </Button>
      </ButtonGroup>
    </Card.Footer>
  );
};

export default ItemFooter;
