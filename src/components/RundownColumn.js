import { useState } from "react";

import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

const RundownColumn = () => {
  const [rundown, setRundown] = useState("");
  // const [apiKey, setapiKey] = useState("");
  // const [apiToken, setapiToken] = useState("");

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
      "https://www.rundowncreator.com/surrey/API.php?APIKey=samsarjudeen&APIToken=VzPXfFFfTy6mvOVxmIy4EMpYlU84lI&Action=getRows&RundownID=" + rundown;

    console.log(url);

    fetch(url)
      .then((response) => response.json())
      .then((data) => setOptions(data));
  };

  return (
        <Form onSubmit={handleFormSubmit}>
          <InputGroup className="mb-3">
            <FloatingLabel controlId="floatingInput" label="API Token">
              <Form.Control
                type="number"
                //   value={apiToken}
                // defaultValue={"VzPXfFFfTy6mvOVxmIy4EMpYlU84lI"}
                onChange={(e) => setRundown(e.target.value)}
                />
            </FloatingLabel>
            <Button variant="primary" type="submit">
            Submit
          </Button>
          </InputGroup>
          
            {JSON.stringify(options, null, 2)}
        </Form>
  );
};

export default RundownColumn;