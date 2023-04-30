// server/index.js

const express = require("express");

var net = require("net");
var config = {
  host: "127.0.0.1",
  port: 5250,
};

let client = new net.Socket();

function connect() {
  client.connect(config.port, config.host, () => {
    console.log("Connected");
  });

  client.on("data", (data) => {
    console.log("Received: " + data);
  });

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

const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

const cors = require("cors");

app.use(cors());

// app.get("/api", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });

app.post("/data", (req, res) => {
  const body = req.body.data;
  client.write(body + "\r\n", function (e) {
    console.log("CG command sent:", body);
  });
  client.once("data", (data) => {
    console.log("Received: " + data);
    res.send(data);
  });
});

app.post("/filegetter", (req, res) => {
  const type = req.body.type;
  // console.log(type);
  if (type === "media") {
    res.send(fileGetter(mediaLocation, "*"));
  } else if (type === "templates") {
    res.send(fileGetter(templateLocation, "html"));
  } else {
    res.send([]);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

glob = require("glob");
const templateLocation = "C:/casparcg/template/";
const mediaLocation = "C:/casparcg/media/";

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
  // console.log(shortPaths);
  return shortPaths;
};
