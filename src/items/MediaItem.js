import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ItemFooter from './components/ItemFooter';

const MediaItem = ({
  title,
  onPlay,
  onNext,
  onUpdate,
  onStop,
  onRemove,
  onMoveUp,
  onMoveDown,
}) => {
  const [channel, setChannel] = useState(1);
  const [layer, setLayer] = useState(20);
  const [selectedMedia, setSelectedMedia] = useState(1);

  const handleMediaSelect = (event) => {
    setSelectedMedia(event.target.value);
  };

  const mediaOptions = [];
  for (let i = 1; i <= 20; i++) {
    mediaOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <Card style={{ margin: '10px' }}>
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Form>
          <Row>
            <Col md={8}>
              <FloatingLabel controlId="media" label="Media">
                <Form.Select
                  value={selectedMedia}
                  onChange={handleMediaSelect}
                >
                  {mediaOptions}
                </Form.Select>
              </FloatingLabel>
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
      <ItemFooter
        onPlay={onPlay}
        onNext={onNext}
        onUpdate={onUpdate}
        onStop={onStop}
        onRemove={onRemove}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
      />
    </Card>
  );
};

export default MediaItem;
