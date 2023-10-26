import React from "react";
import TemplateItem from "../TemplateItem";

const TemplateItemContainer = ({ item, updateItem, onRemove, onMoveUp, onMoveDown }) => {
  return (
    <TemplateItem
      item={item}
      updateItem={(newProperties) => updateItem(item.id, newProperties)}
      onRemove={onRemove}
      onMoveUp={onMoveUp}
      onMoveDown={onMoveDown}
    />
  );
};

export default TemplateItemContainer;
