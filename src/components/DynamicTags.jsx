import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { Trash } from "react-bootstrap-icons";
import { v4 as uuidv4 } from "uuid";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const DynamicTags = ({ tags, setTags }) => {
  const addTag = () => {
    const newTagkey = `f${tags.length}`;
    const newTag = { id: uuidv4(), key: newTagkey, data: "" };
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
    <div className="mb-2">
      {tags.map((tag) => (
        <InputGroup key={tag.id}>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip><b>Template Keys</b><br />Named placeholders in CasparCG templates that indicate where dynamic content (like text, images, or numbers) should go (e.g. f0).</Tooltip>}
          >
            <FormControl
            className='w-10'
              size="sm" // Set size to 'sm' for small
              placeholder="Key"
              value={tag.key}
              onChange={(e) => handleTagChange(tag.id, "key", e.target.value)}
            />
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip><b>Key Value</b><br />The actual content that fills in the template keys. These values can change on the fly, allowing for dynamic, data-driven graphics (e.g someone's first name).</Tooltip>}
          >
          <FormControl
            size="sm" // Set size to 'sm' for small
            placeholder="Data (e.g. First Name)"
            value={tag.text}
            onChange={(e) => handleTagChange(tag.id, "text", e.target.value)}
          />
          </OverlayTrigger>
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
