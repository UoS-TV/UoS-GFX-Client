import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Form } from "react-bootstrap";

const Team = ({ team, vals, startScore, dyTags, dyTagChange }) => {
  const [teamNameID, setTeamNameID] = useState("f" + (team - 1) * 2);
  const [teamName, setTeamName] = useState("Team " + team);
  const [teamScoreID, setTeamScoreID] = useState("f" + ((team - 1) * 2 + 1));
  const [teamScore, setTeamScore] = useState(0);

  useEffect(() => {
    updateDyTags();
  }, [teamScore]);

  var teamDyTags = [
    { id: uuidv4(), dyID: teamNameID, dyData: teamName },
    { id: uuidv4(), dyID: teamScoreID, dyData: String(teamScore) },
  ];

  const updateDyTags = (e) => {
    // e.preventDefault();
    let _dyTags = [];
    _dyTags = [...dyTags];
    var res = _dyTags.map(
      (obj) => teamDyTags.find((o) => o.dyID === obj.dyID) || obj
    );
    dyTagChange(res);
  };

  return (
    <div>
      <InputGroup className="mb-2">
        <FloatingLabel label={"Team " + team + " Name ID"}>
          <FormControl
            value={teamNameID}
            onChange={(e) => setTeamNameID(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel label={"Team " + team + " Score ID"}>
          <FormControl
            value={teamScoreID}
            onChange={(e) => setTeamScoreID(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel label={"Team " + team + " Name"}>
          <FormControl
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </FloatingLabel>
        <Button onClick={updateDyTags}>Set</Button>
      </InputGroup>
      {/* </Form> */}
      <InputGroup>
        <Button
          variant="secondary"
          onClick={() => setTeamScore(teamScore - vals[2])}
        >
          -{vals[2]}
        </Button>
        <Button
          variant="info"
          onClick={() => setTeamScore(teamScore - vals[1])}
        >
          -{vals[1]}
        </Button>
        <Button
          variant="primary"
          onClick={() => setTeamScore(teamScore - vals[0])}
        >
          -{vals[0]}
        </Button>
        <FormControl
          value={teamScore}
          onChange={(e) => setTeamScore(e.target.value)}
          type="number"
          className="text-center"
        />
        <Button
          variant="primary"
          onClick={() => setTeamScore(teamScore + vals[0])}
        >
          +{vals[0]}
        </Button>
        <Button
          variant="info"
          onClick={() => setTeamScore(teamScore + vals[1])}
        >
          +{vals[1]}
        </Button>
        <Button
          variant="secondary"
          onClick={() => setTeamScore(teamScore + vals[2])}
        >
          +{vals[2]}
        </Button>
        <Button variant="danger" onClick={() => setTeamScore(0)}>
          Reset
        </Button>
      </InputGroup>
    </div>
  );
};

export default Team;
