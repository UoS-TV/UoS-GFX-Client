import Button from "react-bootstrap/Button";
import {
  BsPlayFill,
  BsSkipEndFill,
  BsArrowClockwise,
  BsStopFill,
  // BsCommand,
} from "react-icons/bs";

import { useContext } from "react";
import { UserContext } from "./context.jsx";

const CGButtons = ({ data }) => {
  const contexts = useContext(UserContext);
  return (
    <>
      <Button variant="success" onClick={() => contexts.itemActions.play(data)}>
        <BsPlayFill /> Play
      </Button>
      <Button variant="info" onClick={() => contexts.itemActions.next(data)}>
        <BsSkipEndFill /> Next
      </Button>
      <Button
        variant="primary"
        onClick={() => contexts.itemActions.update(data)}
      >
        <BsArrowClockwise /> Update
      </Button>
      <Button variant="danger" onClick={() => contexts.itemActions.stop(data)}>
        <BsStopFill /> Stop
      </Button>
    </>
  );
};

export default CGButtons;
