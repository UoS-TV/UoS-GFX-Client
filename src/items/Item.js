import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import TemplateFooter from "./components/TemplateFooter";
import MediaFooter from "./components/MediaFooter";
import DynamicTags from "./components/DynamicTags";
import axios from "axios";
import ScoreTags from "./components/ScoreTags";

const TemplateItem = ({
  selectedItem,
  item,
  updateItem,
  onRemove,
  onMoveUp,
  onMoveDown,
}) => {
  // Local state for the form fields
  // const [localTitle, setLocalTitle] = useState(item.title);
  // const [localselectedSource, setLocalselectedSource] = useState(
    // item.selectedSource
  // );
  // const [localChannel, setLocalChannel] = useState(item.channel);
  // const [localLayer, setLocalLayer] = useState(item.layer);
  // const [localTags, setLocalTags] = useState(item.tags);

  const [templateOptions, setTemplateOptions] = useState([]);
  const [mediaOptions, setMediaOptions] = useState([]);

  // Extract item properties
  const { title, selectedSource, channel, layer, tags } = item;

  const fetchOptions = () => {
    axios
      .get("http://localhost:3002/list-files")
      .then((response) => {
        setMediaOptions(response.data.media);
        setTemplateOptions(response.data.templates);
      })
      .catch((error) => {
        console.error("Error fetching template names:", error);
      });
  };

  const handleTitleChange = (newTitle) => {
    // setLocalTitle(newTitle);
    updateItem({ title: newTitle });
  };

  const handleSelect = (selected) => {
    // setLocalselectedSource(selected);
    updateItem({ selectedSource: selected });
  };

  const handleChannelChange = (channel) => {
    // setLocalChannel(channel);
    updateItem({ channel: channel });
  };

  const handleLayerChange = (layer) => {
    // setLocalLayer(layer);
    updateItem({ layer: layer });
  };

  const handleTagsChange = (tags) => {
    // setLocalTags(tags);
    updateItem({ tags: tags });
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  return (
    <Card
      border={selectedItem ? "danger" : ""}
      style={{ backgroundColor: `${selectedItem ? "#FF000011" : ""}` }}
      className="mb-3"
    >
      <Card.Header>
        <Form.Control
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
        />
      </Card.Header>
      <Card.Body>
        <Form>
          <Row>
            <Col md={8}>
              {item.type !== "Media" && (
                <InputGroup>
                  <FloatingLabel controlId="template" label="Template">
                    <Form.Select
                      value={selectedSource}
                      onChange={(e) => handleSelect(e.target.value)}
                    >
                      <option disabled>Select Template</option>
                      {templateOptions.map((template, index) => (
                        <option key={index} value={template}>
                          {template}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                  <Button onClick={fetchOptions} variant="outline-info">
                    Refresh
                  </Button>
                </InputGroup>
              )}
              {item.type === "Media" && (
                <InputGroup>
                  <FloatingLabel controlId="media" label="Media">
                    <Form.Select
                      value={selectedSource}
                      onChange={(e) => handleSelect(e.target.value)}
                    >
                      <option disabled>Select Media</option>
                      {mediaOptions.map((media, index) => (
                        <option key={index} value={media}>
                          {media}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                  <Button onClick={fetchOptions} variant="outline-info">
                    Refresh
                  </Button>
                </InputGroup>
              )}
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
        {item.type === "Template" && (
          <DynamicTags tags={tags} setTags={handleTagsChange} />
        )}
        {item.type === "Scorer" && (
          <ScoreTags channel={channel} layer={layer} tags={tags} setTags={handleTagsChange} />
        )}
      </Card.Body>
      {item.type !== "Media" && (
        <TemplateFooter
          onRemove={onRemove}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          selectedTemplate={selectedSource}
          channel={channel}
          layer={layer}
          dynamicTags={tags}
        />
      )}
      {item.type === "Media" && (
        <MediaFooter
          onRemove={onRemove}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          selectedMedia={selectedSource}
          channel={channel}
          layer={layer}
          dynamicTags={tags}
        />
      )}
    </Card>
  );
};

export default TemplateItem;
