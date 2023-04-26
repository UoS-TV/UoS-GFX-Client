import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";

import {
  BsPlayFill,
  BsArrowClockwise,
  BsStopFill,
  BsTrashFill,
} from "react-icons/bs";
import { UserContext } from "./context";

const CustomColumn = () => {
  const contexts = useContext(UserContext);

  const [teamsMembers, setTeamMembers] = React.useState([
    {
      id: uuidv4(),
      template: "",
      channel: "1",
      layer: "20",
      dyTags: [
        {
          dyID: "",
          dyData: "",
          id: uuidv4(),
        },
      ],
    },
  ]);

  //handle add team
  const handleAddTeam = () => {
    let _teamsMembers = [...teamsMembers];
    _teamsMembers.push({
      id: uuidv4(),
      template: "",
      channel: "1",
      layer: "20",
      dyTags: [
        {
          dyID: "",
          dyData: "",
          id: uuidv4(),
        },
      ],
    });
    setTeamMembers(_teamsMembers);
  };

  //handle new memeber inside selected team
  const addNewMemberInTeam = (id) => {
    const index = teamsMembers.findIndex((template) => template.id === id);
    let _teamsMembers = [...teamsMembers];
    _teamsMembers[index].dyTags.push({
      dyID: "",
      dyData: "",
      id: uuidv4(),
    });
    setTeamMembers(_teamsMembers);
  };

  const removeDyField = (id, test) => {
    const index = teamsMembers.findIndex((template) => template.id === id);
    let _teamsMembers = [...teamsMembers];
    _teamsMembers[index].dyTags.splice(test, 1);
    setTeamMembers(_teamsMembers);
  };

  //handle team data
  const handleTeamData = (id, event) => {
    const index = teamsMembers.findIndex((template) => template.id === id);

    let _teamsMembers = [...teamsMembers];

    _teamsMembers[index][event.target.name] = event.target.value;
    setTeamMembers(_teamsMembers);
  };
  //handle inner member data in team
  const handleMemberInTeamData = (teamId, memberId, event) => {
    const teamIndex = teamsMembers.findIndex(
      (template) => template.id === teamId
    );
    let _teamsMembers = [...teamsMembers];
    const memberIndex = teamsMembers[teamIndex].dyTags.findIndex(
      (m) => m.id === memberId
    );
    _teamsMembers[teamIndex].dyTags[memberIndex][event.target.name] =
      event.target.value;
    setTeamMembers(_teamsMembers);
  };

  //save teams data
  const saveTeamData = () => {
    console.table(teamsMembers);
  };

  return (
    <div className="my-4">
      <ButtonGroup className="">
        <Button variant="outline-success" onClick={handleAddTeam}>
          Add Template Item
        </Button>
        <Button variant="outline-success">Add Scorebug Item</Button>
        <Button variant="primary" onClick={saveTeamData}>
          Save Rundown
        </Button>
        <Button variant="info">Load Rundown</Button>
      </ButtonGroup>

      {teamsMembers.map((template) => (
        <Card className="row-section__inner mb-3" key={template.id}>
          <Card.Header
            as="h5"
            className="d-flex justify-content-between align-items-center"
          >
            Template
            {/* {template.id} */}
            <Button variant="outline-danger">Delete Item</Button>
          </Card.Header>
          <Card.Body>
            <InputGroup className="mb-3">
              <Form.Select
                className="sm-7 templateSelect"
                placeholder="Template"
              />
              <FloatingLabel controlId="floatingInput" label="Channel">
                <Form.Control
                  type="number"
                  name="channel"
                  min="1"
                  max={contexts.channelMax}
                  defaultValue={contexts.defaultChannel}
                  onChange={(e) => handleTeamData(template.id, e)}
                />
              </FloatingLabel>
              <InputGroup.Text>-</InputGroup.Text>
              <FloatingLabel controlId="floatingInput" label="Layer">
                <Form.Control
                  type="number"
                  // defaultValue="20"
                  // placeholder="20"
                />
              </FloatingLabel>
            </InputGroup>
            {template.dyTags.map((dyTag) => (
              <div className="my-2" key={dyTag.id}>
                <InputGroup>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Dynamic ID Tag (e.g. f0)"
                  >
                    <Form.Control
                      name="dyID"
                      type="text"
                      placeholder="f0"
                      onChange={(e) =>
                        handleMemberInTeamData(template.id, dyTag.id, e)
                      }
                    />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingInput" label="Data">
                    <Form.Control
                      name="dyData"
                      type="text"
                      placeholder="Data"
                      onChange={(e) =>
                        handleMemberInTeamData(template.id, dyTag.id, e)
                      }
                    />
                  </FloatingLabel>
                  <Button
                    variant="outline-danger"
                    onClick={() => removeDyField(template.id, dyTag.id)}
                  >
                    <BsTrashFill />
                  </Button>
                </InputGroup>
              </div>
            ))}
            <Button
              variant="outline-success"
              size="sm"
              className="float-end"
              onClick={() => addNewMemberInTeam(template.id)}
            >
              Add Dynamic Field
            </Button>
          </Card.Body>
          <Card.Footer className="text-muted">
            <ButtonGroup className="d-flex w-100">
              <Button variant="success">
                <BsPlayFill /> Play
              </Button>
              <Button variant="primary">
                <BsArrowClockwise /> Update
              </Button>
              <Button variant="dark">
                <BsStopFill /> Stop
              </Button>
            </ButtonGroup>
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
};

export default CustomColumn;
