import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import MediaFooter from "./components/MediaFooter";
import axios from "axios";

const MediaItem = ({ onRemove, onMoveUp, onMoveDown }) => {
  const [title, setTitle] = useState("Media Item");
  const [channel, setChannel] = useState(1);
  const [layer, setLayer] = useState(20);
  const [selectedMedia, setSelectedMedia] = useState("Select Media");
  const [mediaOptions, setMediaOptions] = useState([]);

  const fetchMediaOptions = () => {
    // Fetch template names from the server
    axios
      .get("http://localhost:3002/list-files")
      .then((response) => {
        setMediaOptions(response.data.media);
        console.log(response.data.media);
      })
      .catch((error) => {
        console.error("Error fetching template names:", error);
        // Handle the error here, e.g., set an error state
      });
  };

  useEffect(() => {
    // Initial fetch when the component loads
    fetchMediaOptions();
  }, []);

  const handleMediaSelect = (event) => {
    setSelectedMedia(event.target.value);
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
                <FloatingLabel controlId="media" label="Media">
                  <Form.Select
                    value={selectedMedia}
                    onChange={handleMediaSelect}
                  >
                    <option disabled>Select Media</option>
                    {mediaOptions.map((media, index) => (
                      <option key={index} value={media}>
                        {media}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
                <Button onClick={fetchMediaOptions} variant="outline-info">
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
      </Card.Body>
      <MediaFooter
        onRemove={onRemove}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        selectedMedia={selectedMedia}
        channel={channel}
        layer={layer}
      />
    </Card>
  );
};

export default MediaItem;
