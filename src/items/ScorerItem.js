import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ItemFooter from './components/ItemFooter';

const ScorerItem = ({
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
  const [selectedTemplate, setSelectedTemplate] = useState(1);

  const handleTemplateSelect = (event) => {
    setSelectedTemplate(event.target.value);
  };

  const templateOptions = [];
  for (let i = 1; i <= 20; i++) {
    templateOptions.push(
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
              <FloatingLabel controlId="template" label="Template">
                <Form.Select
                  value={selectedTemplate}
                  onChange={handleTemplateSelect}
                >
                  {templateOptions}
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

export default ScorerItem;
