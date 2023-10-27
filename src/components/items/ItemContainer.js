import React from "react";
import Item from "./Item";

const ItemContainer = ({ item, updateItem, onRemove, onMoveUp, onMoveDown, selectedItem, casparCommands }) => {
  return (
    <Item
    selectedItem={selectedItem}
      item={item}
      updateItem={(newProperties) => updateItem(item.id, newProperties)}
      onRemove={onRemove}
      onMoveUp={onMoveUp}
      onMoveDown={onMoveDown}
      casparCommands={casparCommands}
    />
  );
};

export default ItemContainer;
