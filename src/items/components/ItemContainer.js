import React from "react";
import TemplateItem from "../Item";

const TemplateItemContainer = ({ item, updateItem, onRemove, onMoveUp, onMoveDown, selectedItem }) => {
  return (
    <TemplateItem
    selectedItem={selectedItem}
      item={item}
      updateItem={(newProperties) => updateItem(item.id, newProperties)}
      onRemove={onRemove}
      onMoveUp={onMoveUp}
      onMoveDown={onMoveDown}
    />
  );
};

export default TemplateItemContainer;
