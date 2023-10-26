import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import TemplateFooter from "./components/TemplateFooter";
import DynamicTags from "./components/DynamicTags";
import axios from "axios";

const TemplateItem = ({
  item,
  updateItem,
  // title,
  // setTitle,
  // selectedTemplate,
  // setSelectedTemplate,
  // channel,
  // setChannel,
  // layer,
  // setLayer,
  // tags,
  // setTags,
  onRemove,
  onMoveUp,
  onMoveDown
}) => {

  // Local state for the form fields
  const [localTitle, setLocalTitle] = useState(item.title);
  const [localSelectedTemplate, setLocalSelectedTemplate] = useState(
    item.selectedTemplate
  );
  const [localChannel, setLocalChannel] = useState(item.channel);
  const [localLayer, setLocalLayer] = useState(item.layer);
  const [localTags, setLocalTags] = useState(item.tags);

  const [templateOptions, setTemplateOptions] = useState([]);

  // Extract item properties
  const { title, selectedTemplate, channel, layer, tags } = item;

  const fetchTemplateOptions = () => {
    axios
      .get("http://localhost:3002/list-files")
      .then((response) => {
        setTemplateOptions(response.data.templates);
      })
      .catch((error) => {
        console.error("Error fetching template names:", error);
      });
  };


  const handleTitleChange = (newTitle) => {
    setLocalTitle(newTitle);
    updateItem({ title: newTitle });
  };

  const handleTemplateSelect = (selected) => {
    setLocalSelectedTemplate(selected);
    updateItem({ selectedTemplate: selected });
  };

  const handleChannelChange = (channel) => {
    setLocalChannel(channel);
    updateItem({ channel: channel });
  };

  const handleLayerChange = (layer) => {
    setLocalLayer(layer);
    updateItem({ layer: layer });
  };

  const handleTagsChange = (tags) => {
    setLocalTags(tags);
    updateItem({ tags: tags });
  };

  useEffect(() => {
    fetchTemplateOptions();
  }, []);

  return (
    <Card style={{ margin: "10px" }}>
      <Card.Header>
        <Form.Control
          value={localTitle}
          onChange={(e) => handleTitleChange(e.target.value)}
        />
      </Card.Header>
      <Card.Body>
        <Form>
          <Row>
            <Col md={8}>
              <InputGroup>
                <FloatingLabel controlId="template" label="Template">
                  <Form.Select
                    value={localSelectedTemplate}
                    onChange={(e) => handleTemplateSelect(e.target.value)}
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
                    onChange={(e) => handleChannelChange(e.target.value)}
                />
              </FloatingLabel>
            </Col>
            <Col md={2}>
              <FloatingLabel controlId="layer" label="Layer">
                <Form.Control
                  type="number"
                  value={layer}
                    onChange={(e) => handleLayerChange(e.target.value)}
                />
              </FloatingLabel>
            </Col>
          </Row>
        </Form>
        <DynamicTags tags={localTags} setTags={handleTagsChange} />
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
