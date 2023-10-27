import React from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { Trash } from "react-bootstrap-icons";

const DynamicTags = ({ tags, setTags }) => {
  const addTag = () => {
    const newTagId = `f${tags.length}`;
    const newTag = { id: newTagId, text: "" };
    setTags([...tags, newTag]);
  };

  const deleteTag = (id) => {
    const updatedTags = tags.filter((tag) => tag.id !== id);
    setTags(updatedTags);
  };

  const handleTagChange = (tagId, key, value) => {
    const updatedTags = tags.map((tag) => {
      if (tag.id === tagId) {
        return { ...tag, [key]: value };
      }
      return tag;
    });
    setTags(updatedTags);
  };

  return (
    <div className="my-2">
      {tags.map((tag) => (
        <InputGroup key={tag.id}>
          <FormControl
            size="sm" // Set size to 'sm' for small
            placeholder="Key (e.g. f0)"
            value={tag.id}
            onChange={(e) => handleTagChange(tag.id, "id", e.target.value)}
          />
          <FormControl
            size="sm" // Set size to 'sm' for small
            placeholder="Data (e.g. First Name)"
            value={tag.text}
            onChange={(e) => handleTagChange(tag.id, "text", e.target.value)}
          />
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => deleteTag(tag.id)}
          >
            <Trash />
          </Button>
        </InputGroup>
      ))}
      <Button
        className="mt-2 float-end"
        variant="outline-success" // Green outline for "Add Dynamic Tag" button
        size="sm" // Make the button smaller
        onClick={addTag}
      >
        Add Dynamic Tag
      </Button>
    </div>
  );
};

export default DynamicTags;
