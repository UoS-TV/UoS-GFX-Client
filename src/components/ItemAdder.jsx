import { useState } from "react";
import {
  ButtonGroup,
  ToggleButton,
  Form,
  FormSelect,
  Button,
} from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { v4 as uuidv4 } from "uuid";

const ItemAdder = ({ onAddRundownItem }) => {
  const [selectedType, setSelectedType] = useState("template"); // Default selected type
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const itemTypes = [
    { name: "Scorer", value: "scorer", tooltip: "Template playout controls with customisable scoring buttons." },
    { name: "Template", value: "template", tooltip: "Simple template playout controls." },
    { name: "Media", value: "media", tooltip: "Simple media playout controls." },
  ];

  const commonTemplates = [
    "Standard Template",
    "Advanced Template",
    "Custom Template",
  ];
  const mediaTemplates = ["Music Track", "Background Animation", "Video Clip"];

  const handleSubmit = () => {
    if (selectedType && selectedTemplate) {
      // Pass the selected type and template/media to the parent component
      const newItem = {
        id: uuidv4(),
        type: selectedType,
        title: selectedType + " Item",
        selectedSource: selectedTemplate,
        channel: 1,
        layer: 20,
        tags: [
          { id: uuidv4(), key: "f0", data: "" },
          { id: uuidv4(), key: "f1", data: "" },
        ],
      };

      onAddRundownItem(newItem);
    } else {
      alert("Please select an item type and a template/media file.");
    }
  };

  return (
    <Form>
        Choose Item Type:
        <ButtonGroup className="w-100">
          {itemTypes.map((itemType, idx) => (
            <OverlayTrigger
            key={idx}
            placement="top"
            delay={{show: 500}}
            overlay={<Tooltip>{itemType.tooltip}</Tooltip>}
          >
            <ToggleButton
              key={idx}
              id={`item-type-${idx}`}
              type="radio"
              variant={
                selectedType === itemType.value
                ? "primary"
                  : "outline-secondary"
                }
                name="item-type" // Ensures radio button behavior
                value={itemType.value}
                checked={selectedType === itemType.value} // Is this the selected type?
                onChange={(e) => {
                  setSelectedType(e.currentTarget.value);
                  setSelectedTemplate(""); // Reset the selected template on type change
                }}
                className="w-100" // Stretch each button
                >
              {itemType.name}
            </ToggleButton>
              </OverlayTrigger>
          ))}
        </ButtonGroup>
        Choose {selectedType}:
      <Form.Group controlId="templateSelect">
        <FormSelect
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.currentTarget.value)}
        >
          <option value="">
            Select {selectedType === "media" ? "Media" : "Template"}
          </option>
          {selectedType === "media"
            ? mediaTemplates.map((template, idx) => (
                <option key={idx} value={template}>
                  {template}
                </option>
              ))
            : commonTemplates.map((template, idx) => (
                <option key={idx} value={template}>
                  {template}
                </option>
              ))}
        </FormSelect>
      </Form.Group>
      {/* Dynamic text based on the selected type */}
      <Button variant="primary" onClick={handleSubmit} className="w-100">
        Add {selectedType}
      </Button>
    </Form>
  );
};

export default ItemAdder;
