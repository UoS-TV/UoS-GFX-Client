const express = require("express");
const app = express();
const cors = require("cors");
const net = require("net");
const config = require("../public/config.json");
console.log(config);
const glob = require("glob");
const path = require("path");


app.use(cors());
app.use(express.json());

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
  // const body = "INFO 1-1"
  client.write(body + "\r\n", function (e) {
    console.log("Sent:", body);
  });
  client.once("data", (data) => {
    console.log("Received: " + data);
    res.send(data);
  });
});

// Define an endpoint to get template and media files
app.get("/list-files", (req, res) => {
  const templates = fileGetter(config.casparcg.templateLocation, "html");
  const media = fileGetter(config.casparcg.mediaLocation, "*");
console.log(templates);
  res.json({ templates, media });
});

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});

const fileGetter = (location, extension) => {
  return glob.sync(location + "/**/*." + extension, {}).map((file) => {
    console.log(file);
    return file
      .replace(/\\/g, "/") // replace double backslash with forwardslash
      .replace(location, "") // remove location;
      .replace("."+extension, "");
  });
};
