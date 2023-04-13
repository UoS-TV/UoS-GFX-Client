import { useState } from "react";

import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

const RundownSelector = () => {
  const [station, setStation] = useState("");
  const [apiKey, setapiKey] = useState("");
  const [apiToken, setapiToken] = useState("");

  const [options, setOptions] = useState([]);

  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

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
      "https://www.rundowncreator.com/surrey/API.php?APIKey=samsarjudeen&APIToken=VzPXfFFfTy6mvOVxmIy4EMpYlU84lI&Action=getRundowns";

    console.log(url);

    fetch(url)
      .then((response) => response.json())
      .then((data) => setOptions(data));
  };

  function handleSelectChange(event) {
    const selectedItemId = event.target.value;
    const selectedItem = options.find(
      (option) => option.RundownID === parseInt(selectedItemId)
    );
    console.log(selectedItem);
    setSelectedItem(selectedItem);
    this.props.parentCallback(JSON.stringify(selectedItem));
  }

  return (
    <Container>
      <Row pt={4}>
        {/* <Col sm={6}> */}
        <Form onSubmit={handleFormSubmit}>
          <InputGroup className="mb-3">
            <InputGroup.Text>https://www.rundowncreator.com/</InputGroup.Text>
            <FloatingLabel controlId="floatingInput" label="Channel/Station">
              <Form.Control
                type="text"
                //   value={station}
                defaultValue={"surrey"}
                onChange={(e) => setStation(e.target.value)}
              />
            </FloatingLabel>
          </InputGroup>
          <InputGroup className="mb-3">
            <FloatingLabel controlId="floatingInput" label="API Key">
              <Form.Control
                type="text"
                //   value={apiKey}
                defaultValue={"samsarjudeen"}
                onChange={(e) => setapiKey(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="API Token">
              <Form.Control
                type="text"
                //   value={apiToken}
                defaultValue={"VzPXfFFfTy6mvOVxmIy4EMpYlU84lI"}
                onChange={(e) => setapiToken(e.target.value)}
              />
            </FloatingLabel>
          </InputGroup>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Form.Select
            value={selectedItem ? selectedItem.RundownID : ""}
            onChange={handleSelectChange}
          >
            <option>RundownID - Rundown Title</option>
            {options.map((option) => (
              <option key={option.RundownID} value={option.RundownID}>
                {option.RundownID} - {option.Title}
              </option>
            ))}
          </Form.Select>
        </Form>
      </Row>
      <Row>
        {selectedItem && (
          <div>
            <p>{JSON.stringify(selectedItem, null, 2)}</p>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default RundownSelector;
