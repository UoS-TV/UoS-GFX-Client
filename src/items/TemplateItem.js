import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button"
import TemplateFooter from "./components/TemplateFooter";
import DynamicTags from "./components/DynamicTags";
import axios from "axios";

const TemplateItem = ({ onRemove, onMoveUp, onMoveDown }) => {
  const [title, setTitle] = useState("Template Item");
  const [channel, setChannel] = useState(1);
  const [layer, setLayer] = useState(20);
  const [selectedTemplate, setSelectedTemplate] = useState("Select Template");
  const [tags, setTags] = useState([
    { id: "f0", text: "" },
    { id: "f1", text: "" },
  ]);
  const [templateOptions, setTemplateOptions] = useState([]); // State for template options

  const fetchTemplateOptions = () => {
    // Fetch template names from the server
    axios
      .get("http://localhost:3002/list-files")
      .then((response) => {
        setTemplateOptions(response.data.templates);
        console.log(response.data.templates);
      })
      .catch((error) => {
        console.error("Error fetching template names:", error);
        // Handle the error here, e.g., set an error state
      });
  };

  useEffect(() => {
    // Initial fetch when the component loads
    fetchTemplateOptions();
  }, []);

  const handleTemplateSelect = (event) => {
    setSelectedTemplate(event.target.value);
  };

  return (
    <Card style={{ margin: "10px" }}>
      <Card.Header>
      <Form.Control
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Card.Header>
      <Card.Body>
        <Form>
          <Row>
            <Col md={8}>
              <InputGroup>
                <FloatingLabel controlId="template" label="Template">
                  <Form.Select
                    value={selectedTemplate}
                    onChange={handleTemplateSelect}
                  >
                    <option disabled>Select Template</option>
                    {templateOptions.map((template, index) => (
                      <option key={index} value={template}>
                        {template}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
                <Button onClick={fetchTemplateOptions} variant="outline-info">
                  Refresh
                </Button>
              </InputGroup>
            </Col>
            <Col md={2}>
              <FloatingLabel controlId="channel" label="Channel">
                <Form.Control
                  type="number"
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                />
              </FloatingLabel>
            </Col>
            <Col md={2}>
              <FloatingLabel controlId="layer" label="Layer">
                <Form.Control
                  type="number"
                  value={layer}
                  onChange={(e) => setLayer(e.target.value)}
                />
              </FloatingLabel>
            </Col>
          </Row>
        </Form>
        <DynamicTags tags={tags} setTags={setTags} />
      </Card.Body>
      <TemplateFooter
        onRemove={onRemove}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        selectedTemplate={selectedTemplate}
        channel={channel}
        layer={layer}
        dynamicTags={tags}
      />
    </Card>
  );
};

export default TemplateItem;
