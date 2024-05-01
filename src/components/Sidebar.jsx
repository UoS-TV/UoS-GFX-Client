import { Card, CardBody, CardHeader, CardTitle } from "react-bootstrap";
import {
  Row,
  Col,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import DynamicTags from "./DynamicTags";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import TemplateControls from "./TemplateControls";
import MediaControls from "./MediaControls";

const Sidebar = ({ selectedItem, updateItem }) => {
  if (!selectedItem) {
    return (
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title>Item Details</Card.Title>
          <Card.Text>Select an item to see its details</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  const { title, type, selectedSource, channel, layer, tags } = selectedItem;

  const handleTagsChange = (tags) => {
    updateItem({ tags: tags });
  };

  const fileUrl = 'src/assets/lower-third-css-animations.html';

  return (
    <Col>
      <Card style={{ width: "100%" }}>
        <Card.Header>
          {type === "media" && <MediaControls item={selectedItem} />}
          {type !== "media" && <TemplateControls item={selectedItem} />}
        </Card.Header>
        <Card.Body>
          <Form className="my-2">
            <FloatingLabel controlId="floatingInput" label="Item Name">
              <Form.Control
                value={title}
                onChange={(e) => updateItem({ title: e.target.value })}
              />
            </FloatingLabel>
            {type !== "Media" && (
              <FloatingLabel controlId="template" label="Template">
                <Form.Select
                  value={selectedSource}
                  onChange={(e) =>
                    updateItem({ selectedSource: e.target.value })
                  }
                >
                  <option disabled>Select Template</option>
                  {/* {templateOptions.map((template, index) => (
                  <option key={index} value={template}>
                  {template}
                  </option>
                ))} */}
                </Form.Select>
              </FloatingLabel>
            )}
            {type === "Media" && (
              <FloatingLabel controlId="media" label="Media">
                <Form.Select
                  value={selectedSource}
                  onChange={(e) =>
                    updateItem({ selectedSource: e.target.value })
                  }
                >
                  <option disabled>Select Media</option>
                  {/* {mediaOptions.map((media, index) => (
                  <option key={index} value={media}>
                  {media}
                  </option>
                ))} */}
                </Form.Select>
              </FloatingLabel>
            )}
            <Row>
              <Col>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    <Tooltip>
                      Select the CasparCG output channel for your item.
                    </Tooltip>
                  }
                >
                  <FloatingLabel controlId="channel" label="Channel">
                    <Form.Control
                      type="number"
                      value={channel}
                      onChange={(e) => updateItem({ channel: e.target.value })}
                    />
                  </FloatingLabel>
                </OverlayTrigger>
              </Col>
              <Col>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    <Tooltip>
                      Define the stacking order within a channel; higher numbers
                      appear on top.
                    </Tooltip>
                  }
                >
                  <FloatingLabel controlId="layer" label="Layer">
                    <Form.Control
                      type="number"
                      value={layer}
                      onChange={(e) => updateItem({ layer: e.target.value })}
                    />
                  </FloatingLabel>
                </OverlayTrigger>
              </Col>
            </Row>
          </Form>
          <DynamicTags tags={tags} setTags={handleTagsChange} />
        </Card.Body>
        <Card.Footer>ID: {selectedItem.id}</Card.Footer>
      </Card>
    </Col>
  );
};

export default Sidebar;
