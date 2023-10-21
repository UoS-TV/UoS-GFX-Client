const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const glob = require("glob");

const config = require("../public/config.json");
console.log(config)

app.use(cors());

app.get("/list-templates", (req, res) => {
  const files = fileGetter(config.casparcg.templateLocation, "html");
  console.log(files);
  res.json(files);
});

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});

const fileGetter = (location, extension) => {
  return glob.sync(location + "/**/*." + extension, {}).map((file) => {
    console.log(file);
    return file
      .replace(/\\/g, "/") // replace double backslash with forwardslash
      .replace(location, ""); // remove location;
  });
};
