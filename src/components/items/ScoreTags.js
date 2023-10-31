import { React, useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Col, Row } from "react-bootstrap";

const ScoreTags = ({ channel, layer, tags, setTags }) => {
  // const [vals, setVals] = useState([1, 3, 5]);
  const vals = [1, 3, 5];
  const [teams, setTeams] = useState([
    {
      nameId: "f0",
      scoreId: "f1",
      name: "Team 1",
      score: 0,
    },
    {
      nameId: "f2",
      scoreId: "f3",
      name: "Team 2",
      score: 0,
    },
  ]);

  // Update the dynamic tags whenever teams or tags change
  useEffect(() => {
    // Create an array to store the updated dynamic tags
    const updatedTags = [];

    teams.forEach((team) => {
      // Create a tag object for the nameId and name
      const nameIdTag = { id: team.nameId, text: team.name };
      // Create a tag object for the scoreId and score
      const scoreIdTag = { id: team.scoreId, text: team.score.toString() };

      // Push the nameId and name tag
      updatedTags.push(nameIdTag);
      updatedTags.push(scoreIdTag);
    });
    // Update the dynamic tags state with the new tags
    setTags(updatedTags);
  }, [teams]);

  const handleTagChange = (index, property, newValue) => {
    const updatedTeams = [...teams];
    updatedTeams[index] = {
      ...updatedTeams[index],
      [property]: newValue,
    };
    setTeams(updatedTeams);
  };

  return (
    <Row>
      {teams.map((team, index) => (
        <Col className="w-50" key={index}>
          <InputGroup className="my-2">
            <FloatingLabel label={"Team " + (index + 1) + " Name ID"}>
              <FormControl
                value={team.nameId}
                onChange={(e) =>
                  handleTagChange(index, "nameId", e.target.value)
                }
              />
            </FloatingLabel>
            <FloatingLabel label={"Team " + (index + 1) + " Score ID"}>
              <FormControl
                value={team.scoreId}
                onChange={(e) =>
                  handleTagChange(index, "scoreId", e.target.value)
                }
              />
            </FloatingLabel>
            <FloatingLabel label={"Team " + (index + 1) + " Name"}>
              <FormControl
                value={team.name}
                onChange={(e) => handleTagChange(index, "name", e.target.value)}
              />
            </FloatingLabel>
          </InputGroup>
          <InputGroup>
            <Button
              variant="outline-secondary"
              onClick={() =>
                handleTagChange(index, "score", team.score - vals[2])
              }
            >
              -{vals[2]}
            </Button>
            <Button
              variant="outline-info"
              onClick={() =>
                handleTagChange(index, "score", team.score - vals[1])
              }
            >
              -{vals[1]}
            </Button>
            <Button
              variant="outline-primary"
              onClick={() =>
                handleTagChange(index, "score", team.score - vals[0])
              }
            >
              -{vals[0]}
            </Button>
            <FormControl
              value={team.score}
              onChange={(e) => handleTagChange(index, "score", e.target.value)}
              type="number"
              className="text-center"
            />
            <Button
              variant="outline-primary"
              onClick={() =>
                handleTagChange(index, "score", team.score + vals[0])
              }
            >
              +{vals[0]}
            </Button>
            <Button
              variant="outline-info"
              onClick={() =>
                handleTagChange(index, "score", team.score + vals[1])
              }
            >
              +{vals[1]}
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() =>
                handleTagChange(index, "score", team.score + vals[2])
              }
            >
              +{vals[2]}
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => handleTagChange(index, "score", 0)}
            >
              Reset
            </Button>
          </InputGroup>
        </Col>
      ))}
    </Row>
  );
};

export default ScoreTags;
