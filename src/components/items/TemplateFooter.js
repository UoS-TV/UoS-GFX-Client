import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import { Trash, CaretUpFill, CaretDownFill } from "react-bootstrap-icons";

const TemplateFooter = ({
  onRemove,
  onMoveUp,
  onMoveDown,
  selectedTemplate,
  channel,
  layer,
  tags,
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
            casparCommands.cgPlay({
              channel,
              layer,
              selectedTemplate,
              tags,
            });
          }}
        >
          Play
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            casparCommands.cgNext({ channel, layer });
          }}
        >
          Next
        </Button>
        <Button
          variant="info"
          onClick={() => {
            casparCommands.cgUpdate({ channel, layer, tags: tags });
          }}
        >
          Update
        </Button>
        <Button
          variant="warning"
          onClick={() => {
            casparCommands.cgStop({ channel, layer });
          }}
        >
          Stop
        </Button>
      </ButtonGroup>
    </Card.Footer>
  );
};

export default TemplateFooter;
