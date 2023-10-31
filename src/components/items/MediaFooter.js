import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import { Trash, CaretUpFill, CaretDownFill } from "react-bootstrap-icons";

const ItemFooter = ({
  onRemove,
  onMoveUp,
  onMoveDown,
  selectedMedia,
  channel,
  layer,
  casparCommands,
}) => {
  return (
    <Card.Footer className="d-flex justify-content-between align-items-center">
      <Button variant="danger" onClick={onRemove}>
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
        <Button
          variant="success"
          onClick={() => {
            casparCommands.play({ channel, layer, selectedMedia });
          }}
        >
          Play
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            casparCommands.load({ channel, layer, selectedMedia });
          }}
        >
          Load
        </Button>
        <Button
          variant="info"
          onClick={() => {
            casparCommands.pause({ channel, layer });
          }}
        >
          Pause
        </Button>
        <Button
          variant="warning"
          onClick={() => {
            casparCommands.stop({ channel, layer });
          }}
        >
          Stop
        </Button>
      </ButtonGroup>
    </Card.Footer>
  );
};

export default ItemFooter;
