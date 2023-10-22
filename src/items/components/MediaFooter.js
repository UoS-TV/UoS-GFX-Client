import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import { Trash, CaretUpFill, CaretDownFill } from "react-bootstrap-icons"; // Import the Trash, CaretUpFill, and CaretDownFill icons
import axios from "axios";

const ItemFooter = ({
  onRemove,
  onMoveUp,
  onMoveDown,
  selectedMedia,
  channel,
  layer,
}) => {

  const send = (command) => {
    axios
      .post("http://localhost:3002/data", { data: command })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const onPlay = () => {
    const payload =
      "PLAY " +
      channel +
      "-" +
      layer +
      ' "' +
      selectedMedia +
      '"';
    console.log(payload);
    // Send the payload to your CasparCG server
    send(payload);
  };

  const onLoad = () => {
    const payload =
      "LOAD " +
      channel +
      "-" +
      layer +
      ' "' +
      selectedMedia +
      '"';
    console.log(payload);
    // Send the payload to your CasparCG server
    send(payload);
  };

  const onPause = () => {
    const payload =
      "PAUSE " +
      channel +
      "-" +
      layer;
    console.log(payload);
    // Send the payload to your CasparCG server
    send(payload);
  };

  const onStop = () => {
    const payload =
      "STOP " +
      channel +
      "-" +
      layer;
    console.log(payload);
    // Send the payload to your CasparCG server
    send(payload);
  };

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
        <Button variant="success" onClick={onPlay}>
          Play
        </Button>
        <Button variant="primary" onClick={onLoad}>
          Load
        </Button>
        <Button variant="info" onClick={onPause}>
          Pause
        </Button>
        <Button variant="warning" onClick={onStop}>
          Stop
        </Button>
      </ButtonGroup>
    </Card.Footer>
  );
};

export default ItemFooter;
