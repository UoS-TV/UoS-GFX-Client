// server/index.js

const express = require("express");
const app = express();
const path = require("path");
var fs = require("fs");
const cors = require("cors");
const net = require("net");
const glob = require("glob");

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const config = require("../src/config.json");

let client = new net.Socket();

function connect() {
  client.connect(config.casparcg.port, config.casparcg.host, () => {
    console.log("Connected");
  });

  // client.on("data", (data) => {
  //   console.log("Received: " + data);
  // });

  client.on("close", () => {
    console.log("Connection closed");
    reconnect();
  });

  client.on("end", () => {
    console.log("Connection ended");
    reconnect();
  });

  client.on("error", console.error);
}

// function that reconnect the client to the server
const reconnect = () => {
  console.log("Retrying connection to CasparCG server in 5s");
  setTimeout(() => {
    client.removeAllListeners(); // the important line that enables you to reopen a connection
    connect();
  }, 5000);
};

connect();

app.post("/data", (req, res) => {
  const body = req.body.data;
  client.write(body + "\r\n", function (e) {
    console.log("Sent:", body);
  });
  client.once("data", (data) => {
    console.log("Received: " + data);
    res.send(data);
  });
});
let items = { templates: [], media: [] };
app.post("/filegetter", (req, res) => {
  console.log("Getting library files");
  items.media = fileGetter(config.casparcg.mediaLocation, "*");
  items.templates = fileGetter(config.casparcg.templateLocation, "html");
  res.send(items);
  console.log(items);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const fileGetter = (location, extension) => {
  var fullPaths = [];
  // console.log("Search location: ", location);
  // console.log("Extension to filter: ", extension);
  fullPaths = glob.sync(location + "**/*." + extension, {});
  var shortPaths = [];
  for (i in fullPaths) {
    shortPaths[i] = fullPaths[i]
      .replace(/\\/g, "/") // replace double backslash with forwardslash
      .replace(location, "") // remove location
      .replace(path.parse(fullPaths[i]).ext, ""); // remove file extension
  }
  return shortPaths;
};
