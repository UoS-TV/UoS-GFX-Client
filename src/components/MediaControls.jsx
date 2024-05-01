import { Button, ButtonGroup } from "react-bootstrap";
import { PauseFill, PlayFill, StopFill, Upload } from "react-bootstrap-icons";

const MediaControls = ({ item }) => {
  return (
    <ButtonGroup className="d-flex">
      <Button
        variant="success"
        onClick={() => {
          console.log("Play:", item.id);
          // casparCommands.cgPlay({
          //   channel,
          //   layer,
          //   selectedTemplate,
          //   tags,
          // });
        }}
      >
        <PlayFill />
        Play
      </Button>
      <Button
        variant="primary"
        onClick={() => {
          console.log("Load:", item.id);
          // casparCommands.cgNext({ channel, layer });
        }}
      >
        <Upload /> Load
      </Button>
      <Button
        variant="info"
        onClick={() => {
          console.log("Pause:", item.id);
          // casparCommands.cgUpdate({ channel, layer, tags: tags });
        }}
      >
        <PauseFill /> Pause
      </Button>
      <Button
        variant="warning"
        onClick={() => {
          console.log("Stop:", item.id);
          // casparCommands.cgStop({ channel, layer });
        }}
      >
        <StopFill /> Stop
      </Button>
    </ButtonGroup>
  );
};

export default MediaControls;
