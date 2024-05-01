import { Button, ButtonGroup } from "react-bootstrap";
import {
  BoxArrowInUpRight,
  PlayFill,
  SkipForwardFill,
  StopFill,
} from "react-bootstrap-icons";

const TemplateControls = ({ item }) => {
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
          console.log("Next:", item.id);
          // casparCommands.cgNext({ channel, layer });
        }}
      >
        <SkipForwardFill /> Next
      </Button>
      <Button
        variant="info"
        onClick={() => {
          console.log("Update:", item.id);
          // casparCommands.cgUpdate({ channel, layer, tags: tags });
        }}
      >
        <BoxArrowInUpRight /> Update
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

export default TemplateControls;
