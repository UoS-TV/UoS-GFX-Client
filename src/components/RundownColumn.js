import { useState } from "react";

import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import GFXItem from "./GFXItem";
import Card from "react-bootstrap/Card";
import styled from "styled-components";

export const BorderCard = styled(Card)`
  background: ${(props) => (props.selected ? "#E8F1FF" : "#FFFFFF")};
  border: ${(props) =>
    props.selected ? "1.5px solid #2375A4" : "1px solid #d5dde3"};
`;

const RundownColumn = () => {
  const [rundown, setRundown] = useState("");

  const [options, setOptions] = useState([]);

  var results = [];

  // station = "surrey";
  // apiKey = "samsarjudeen";
  // apiToken = "VzPXfFFfTy6mvOVxmIy4EMpYlU84lI";

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // const url = "https://www.rundowncreator.com/" +
    //     station +
    //     "/API.php?APIKey=" +
    //     apiKey +
    //     "&APIToken=" +
    //     apiToken +
    // "&Action=getRundowns";
    const url =
      "https://www.rundowncreator.com/surrey/API.php?APIKey=samsarjudeen&APIToken=VzPXfFFfTy6mvOVxmIy4EMpYlU84lI&Action=getRows&RundownID=" +
      rundown;

    console.log(url);

    fetch(url)
      .then((response) => response.json())
      .then((data) => setOptions(data));
  };

  const [isSelected, setisSelected] = useState(0);

  return (
    <Form onSubmit={handleFormSubmit}>
      <InputGroup className="mb-3">
        <FloatingLabel controlId="floatingInput" label="Rundown ID">
          <Form.Control
            type="number"
            // defaultValue={"143"}
            onChange={(e) => setRundown(e.target.value)}
          />
        </FloatingLabel>
        <Button variant="primary" type="submit">
          Get Rundown
        </Button>
      </InputGroup>
      {options.map((option, index) => {
        const results = [];
        return (
          <>
            <GFXItem
              data={option}
              dyTags={results}
              key={option.RowID}
              selected={isSelected === option.RowID}
              onChange={() => {setisSelected(option.RowID)}}
            />
          </>
        );
      })}
    </Form>
  );
};

export default RundownColumn;
