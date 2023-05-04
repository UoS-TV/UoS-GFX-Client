import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { Form } from "react-bootstrap";

import { useContext, useEffect, useState } from "react";
import Team from "./Team";
import { v4 as uuidv4 } from "uuid";

import { UserContext } from "./context.jsx";

const Scorer = (props) => {
  const contexts = useContext(UserContext);
  const [vals, setVals] = useState([1, 3, 5]);

  const handleValChange = (index, e) => {
    let _vals = [...vals];
    _vals[index] = parseInt(e.target.value);
    setVals(_vals);
    console.log(_vals);
  };

  const [dyTags, setDyTags] = useState([
    {
      dyID: "f0",
      dyData: "Team 1",
      id: uuidv4(),
    },
    {
      dyID: "f1",
      dyData: 0,
      id: uuidv4(),
    },
    {
      dyID: "f2",
      dyData: "Team 2",
      id: uuidv4(),
    },
    {
      dyID: "f3",
      dyData: 0,
      id: uuidv4(),
    },
  ]);

  useEffect(() => {
    console.table(dyTags);
    let _dyTags = [...dyTags];
    props.setDyTags(_dyTags);
    var data = {
      channel: props.data.channel,
      layer: props.data.layer,
      template: props.data.template,
      dyTags: dyTags,
    };
    console.table(data);

    contexts.itemActions.update(data);
  }, dyTags);
  if (props.type === "Score") {
    return (
      <>
        <div className="my-2">
          <InputGroup>
            {[...vals].map((i, index) => (
              <FloatingLabel label={"Value " + (index + 1)}>
                <FormControl
                  value={vals[index]}
                  min={0}
                  type="number"
                  className="text-center"
                  onChange={(e) => {
                    handleValChange(index, e);
                  }}
                />
              </FloatingLabel>
            ))}
          </InputGroup>
        </div>
        <div>
          <Row my={4}>
            <Col sm={6}>
              <Team
                team={1}
                vals={vals}
                dyTags={dyTags}
                dyTagChange={setDyTags}
              />
            </Col>
            <Col sm={6}>
              <Team
                team={2}
                vals={vals}
                dyTags={dyTags}
                dyTagChange={setDyTags}
              />
            </Col>
          </Row>
        </div>
      </>
    );
  }
};

export default Scorer;
