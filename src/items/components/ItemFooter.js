import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import { Trash, CaretUpFill, CaretDownFill } from "react-bootstrap-icons"; // Import the Trash, CaretUpFill, and CaretDownFill icons
import axios from "axios";

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
  dynamicTags,
}) => {
  const formatTags = (data) => {
    // Convert the dynamic tags array to the desired format
    const formattedTags = data.reduce((acc, tag) => {
      acc[tag.id] = tag.text;
      return acc;
    }, {});

    const formattedTagsString = JSON.stringify(formattedTags).replace(
      /"/g,
      '\\"'
    );
    const finalString = ` "${formattedTagsString}"`;
    return finalString;
  };

  const send = (command) => {
    axios
      .post("http://localhost:3002/data", { data: command })
      .then((response) => {
        console.log("Success", response.data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const onPlay = () => {
    // const payload = 'CG 1-20 ADD 1 "UOS-GFX-PACKAGE/CLOCK-TIME" 1 "<templateData><componentData id=\"f0\"><data id=\"text\" value=\"\"/></componentData><componentData id=\"f1\"><data id=\"text\" value=\"\"/></componentData></templateData>"'
    const payload =
      "CG " +
      channel +
      "-" +
      layer +
      ' ADD 1 "' +
      selectedTemplate +
      '" 1 ' +
      formatTags(dynamicTags);
    console.log(payload);
    // Send the payload to your CasparCG server
    send(payload);
  };

  const onNext = () => {
    const payload =
      "CG " +
      channel +
      "-" +
      layer +
      ' NEXT ';
    console.log(payload);
    // Send the payload to your CasparCG server
    send(payload);
  };

  const onUpdate = () => {
    const payload =
      "CG " +
      channel +
      "-" +
      layer +
      ' UPDATE 1 ' +
      formatTags(dynamicTags);
    console.log(payload);
    // Send the payload to your CasparCG server
    send(payload);
  };
  const onStop = () => {
    const payload = "CG " + channel + "-" + layer + " STOP 1";
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
