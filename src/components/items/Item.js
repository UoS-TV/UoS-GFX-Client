import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import TemplateFooter from "./TemplateFooter";
import MediaFooter from "./MediaFooter";
import DynamicTags from "./DynamicTags";
import axios from "axios";
import ScoreTags from "./ScoreTags";

const Item = ({
  selectedItem,
  item,
  updateItem,
  onRemove,
  onMoveUp,
  onMoveDown,
  casparCommands,
}) => {
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

  const handleTagsChange = (tags) => {
    updateItem({ tags: tags });
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  return (
    <Card
      // border={selectedItem ? "danger" : ""}
      // style={{ backgroundColor: `${selectedItem ? "#FF000011" : ""}` }}
      className="mb-3"
    >
      <Card.Header>
        <Form.Control
          value={title}
          onChange={(e) => updateItem({ title: e.target.value })}
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
                      onChange={(e) =>
                        updateItem({ selectedSource: e.target.value })
                      }
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
                      onChange={(e) =>
                        updateItem({ selectedSource: e.target.value })
                      }
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
                  onChange={(e) => updateItem({ channel: e.target.value })}
                />
              </FloatingLabel>
            </Col>
            <Col md={2}>
              <FloatingLabel controlId="layer" label="Layer">
                <Form.Control
                  type="number"
                  value={layer}
                  onChange={(e) => updateItem({ layer: e.target.value })}
                />
              </FloatingLabel>
            </Col>
          </Row>
        </Form>
        {item.type === "Template" && (
          <DynamicTags tags={tags} setTags={handleTagsChange} />
        )}
        {item.type === "Scorer" && (
          <ScoreTags
            channel={channel}
            layer={layer}
            tags={tags}
            setTags={handleTagsChange}
          />
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
          tags={tags}
          casparCommands={casparCommands}
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
          casparCommands={casparCommands}
        />
      )}
    </Card>
  );
};

export default Item;
