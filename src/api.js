const express = require("express");
const app = express();
const cors = require("cors");
const net = require("net");
const config = require("../public/config.json");
console.log(config);
const glob = require("glob");
const path = require("path");
const fs = require("fs");

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

let rundownDatabase = [];
const rundownFilename = "rundowns.json";
// Load rundown data from the 'rundowns.json' file
function loadRundownData() {
  try {
    const data = fs.readFileSync(rundownFilename, "utf8");
    rundownDatabase = JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist, start with an empty database
    rundownDatabase = [];
  }
}

// Save rundown data to the 'rundowns.json' file
function saveRundownData() {
  fs.writeFileSync(
    "rundowns.json",
    JSON.stringify(rundownDatabase, null, 2),
    "utf8"
  );
}

// Initialize the rundown data
loadRundownData();

app.get("/rundown", (req, res) => {
  res.json(rundownDatabase);
});

app.post("/rundown", (req, res) => {
  const newItem = req.body;
  rundownDatabase.push(newItem);
  saveRundownData(); // Save the updated rundown data to the file
  res.json(newItem);
});

app.put("/rundown/:id", (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;
  for (let i = 0; i < rundownDatabase.length; i++) {
    if (rundownDatabase[i].id === itemId) {
      rundownDatabase[i] = updatedItem;
      saveRundownData(); // Save the updated rundown data to the file
      return res.json(updatedItem);
    }
  }
  res.status(404).json({ error: "Item not found" });
});

app.delete("/rundown/:id", (req, res) => {
  const itemId = req.params.id;
  rundownDatabase = rundownDatabase.filter((item) => item.id !== itemId);
  saveRundownData(); // Save the updated rundown data to the file
  res.json({ message: "Item deleted" });
});

// Handle an HTTP request to retrieve a rundown by name
app.post("/load-rundown", (req, res) => {
  console.log("load rundown called");
  const rundownid = req.body.rundownid;
  console.log(rundownid);
  // Find the rundown by name in the loaded data
  loadRundownData();
  const selectedRundown = rundownDatabase.find(
    (rundown) => rundown.id === rundownid
  );
  console.log(selectedRundown);
  if (selectedRundown) {
    res.json({ data: selectedRundown });
  } else {
    res.status(404).json({ error: "Rundown not found" });
  }
});

// Endpoint to list rundowns
app.get("/list-rundowns", (req, res) => {
  // Read the rundowns from your database or JSON file
  loadRundownData();
  console.log("listing rundowns:", rundownDatabase);
  // Send the rundowns as JSON response
  res.json(rundownDatabase);
});

app.delete("/delete-rundown/:id", (req, res) => {
  const rundownId = req.params.id;
  console.log("Deleting", rundownId);
  // Read the existing JSON file
  const rundowns = JSON.parse(fs.readFileSync(rundownFilename));

  // Find the index of the rundown to delete
  const indexToDelete = rundowns.findIndex(
    (rundown) => rundown.id === rundownId
  );

  if (indexToDelete !== -1) {
    // Remove the rundown from the array
    rundowns.splice(indexToDelete, 1);

    // Write the updated data back to the JSON file
    fs.writeFileSync(rundownFilename, JSON.stringify(rundowns, null, 2));

    res.json({ message: "Rundown deleted successfully" });
  } else {
    res.status(404).json({ error: "Rundown not found" });
  }
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
      .replace("." + extension, "");
  });
};
