import { useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import RundownItem from "./RundownItem";
import Sidebar from "./Sidebar";
import { Col, Container, Row } from "react-bootstrap";
import ItemAdder from "./ItemAdder";

const Rundown = () => {
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const currentIndex = items.findIndex((item) => item.id === selectedItemId);

      if (e.key === "ArrowDown") {
        // Move selection down (next item)
        const nextIndex = Math.min(currentIndex + 1, items.length - 1);
        setSelectedItemId(items[nextIndex]?.id);
      } else if (e.key === "ArrowUp") {
        // Move selection up (previous item)
        const prevIndex = Math.max(currentIndex - 1, 0);
        setSelectedItemId(items[prevIndex]?.id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown); // Cleanup
    };
  }, [items, selectedItemId]); // Re-run when `items` or `selectedItemId` changes

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      setItems((prevItems) => arrayMove(prevItems, oldIndex, newIndex)); // Reorder items
    }
  };

  const handleAddRundownItem = (newItem) => {
    if (!newItem.id || !newItem.type || !newItem.selectedSource) {
      console.error("New item is missing required properties");
      return;
    }

    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleDeleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateItem = (itemId, updatedItem) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, ...updatedItem };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const selectedItem = items.find((item) => item.id === selectedItemId);

  return (
    <Container fluid>
      <Row>
        <Col sm={3}>
          <ItemAdder onAddRundownItem={handleAddRundownItem} />
        </Col>
        <Col sm={6} style={{ height: '80vh', overflowY: 'auto' }}>
          <DndContext onDragEnd={onDragEnd} collisionDetection={closestCenter}>
            <SortableContext
              items={items.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {items.map((item) => (
                <RundownItem
                  key={item.id}
                  item={item}
                  updateItem={(newProperties) => updateItem(item.id, newProperties)}
                  onClick={() => setSelectedItemId(item.id)} // Set selected item
                  isSelected={item.id === selectedItemId} // Determine if selected
                  onDelete={() => handleDeleteItem(item.id)}
                />
              ))}
            </SortableContext>
          </DndContext>
        </Col>
        <Col sm={3}>
          <Sidebar selectedItem={selectedItem} updateItem={(newProperties) => updateItem(selectedItem.id, newProperties)}/>
        </Col>
      </Row>
    </Container>
  );
};

export default Rundown;
