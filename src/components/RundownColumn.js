import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import GFXItem from "./GFXItem";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import styled from "styled-components";

import { UserContext } from "./context.jsx";
import { useContext, useState } from "react";

export const BorderCard = styled(Card)`
  background: ${(props) => (props.selected ? "#E8F1FF" : "#FFFFFF")};
  border: ${(props) =>
    props.selected ? "1.5px solid #2375A4" : "1px solid #d5dde3"};
`;

const RundownColumn = () => {
  const contexts = useContext(UserContext);

  const url =
    "https://www.rundowncreator.com/" +
    contexts.api.station +
    "/API.php?APIKey=" +
    contexts.api.key +
    "&APIToken=" +
    contexts.api.token;

  // const url =
  // "https://www.rundowncreator.com/surrey/API.php?APIKey=samsarjudeen&APIToken=VzPXfFFfTy6mvOVxmIy4EMpYlU84lI";

  const [selectedRundown, setSelectedRundown] = useState("");

  const [options, setOptions] = useState([]);
  const [rundowns, setRundowns] = useState([]);

  const [isSelected, setisSelected] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleGetRundowns = (event) => {
    event.preventDefault();

    console.log(url);

    fetch(url + "&Action=getRundowns")
      .then((response) => response.json())
      .then((data) => {
        setRundowns(data);
        console.log("Rundowns Gathered:", data.length);
      });
  };

  const handleSelectChange = (event) => {
    event.preventDefault();
    const selectedItemId = event.target.value;
    const selectedItem = rundowns.find(
      (option) => option.RundownID === parseInt(selectedItemId)
    );
    console.log("Selected Rundown ID:", selectedItemId);
    setSelectedItem(selectedItem);
    setSelectedRundown(selectedItemId);
    // this.props.parentCallback(JSON.stringify(selectedItem));
  };

  const handleGetItems = (event) => {
    event.preventDefault();
    fetch(url + "&Action=getRows&RundownID=" + selectedRundown)
      .then((response) => response.json())
      .then((data) => {
        setOptions(data);
        console.log(data);
      });
  };

  return (
    <div className="my-4">
      <Row pt={4}>
        <Form>
          <InputGroup>
            <Button variant="primary" onClick={handleGetRundowns}>
              Get Rundowns
            </Button>
            <Form.Select
              // key={selectedItem.RundownID}
              value={selectedItem ? selectedItem.RundownID : ""}
              onChange={handleSelectChange}
            >
              <option>RundownID - Rundown Title</option>
              {rundowns.map((option) => (
                <option key={option.RundownID} value={option.RundownID}>
                  {option.RundownID} - {option.Title}
                </option>
              ))}
            </Form.Select>
            <Button variant="primary" onClick={handleGetItems}>
              Get Items
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
                  onChange={() => {
                    setisSelected(option.RowID);
                  }}
                />
              </>
            );
          })}
        </Form>
      </Row>
      <Row>
        {selectedItem && (
          <div>
            <p>{JSON.stringify(selectedItem, null, 2)}</p>
          </div>
        )}
      </Row>
    </div>
  );
};

export default RundownColumn;
