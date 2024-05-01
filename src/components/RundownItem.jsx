import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, Button } from "react-bootstrap";
import { ArrowsMove, Trash } from "react-bootstrap-icons";
import TemplateControls from "./TemplateControls";
import MediaControls from "./MediaControls";

const RundownItem = ({ item, onClick, isSelected, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
    });

  const { title, type, selectedSource, channel, layer, tags } = item;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: isSelected ? "2px solid #007bff" : "1px solid lightgray",
  };

  return (
    <Card ref={setNodeRef} style={style} onClick={onClick} className="mb-2">
      <Card.Header>{title}</Card.Header>
      <Card.Body className="d-flex align-items-center">
        {type}: {selectedSource} | Channel: {channel} | Layer: {layer}
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between align-items-center">
        <Button {...attributes} {...listeners} variant="light">
          <ArrowsMove />
        </Button>
        {item.type === "media" && <MediaControls item={item} />}
        {item.type !== "media" && <TemplateControls item={item} />}
        <Button variant="danger" onClick={() => onDelete(item.id)}>
          <Trash />
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default RundownItem;
