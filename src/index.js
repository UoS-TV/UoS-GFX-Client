import "bootstrap/dist/css/bootstrap.min.css";

import { createRoot } from "react-dom/client";

import React, { useState } from "react";

import axios from "axios";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import MainSection from "./components/MainSection";
import Footer from "./components/Footer";

import { UserContext } from "./components/context";

import configData from "./config.json";
import FileSaver from "file-saver";

const channels = configData.channels;

const handleSaveToPC = (jsonData, filename) => {
  var blob = new Blob([JSON.stringify(jsonData, null, 2)], {
    type: "application/json",
  });
  FileSaver.saveAs(blob, filename);
};

const dyTagHandler = (dyTags) => {
  var obj = {};
  dyTags.forEach((dyTag) => {
    obj[dyTag.dyID] = dyTag.dyData;
  });
  console.log(obj);
  // escaping function
  return JSON.stringify(obj).replace(/"/g, '\\"');
};

const App = () => {
  const [commandBox, setCommandBox] = useState("");

  const handleSendToServer = (data) => {
    console.log("handle send to server function called!");
    axios
      .post("http://localhost:3001/data", { data: data })
      .then((response) => {
        console.log(response.data);
        // setCommandBox(response.data); //THIS DOES WEIRD STUFF AND TRIGGERS ANOTHER FUNTION
      });
  };

  const getItems = (data) => {
    console.log("get items server function called!");
    axios
      .post("http://localhost:3001/filegetter", { type: data })
      .then((response) => {
        var _items = items;
        _items[data] = response.data;
        setItems(_items);
        console.log("Response: ", response.data);
        console.log(items);
      })
      .catch((error) => {
        var _items = items;
        console.log("got errr while posting data", error);
        _items[data] = [`Start server link and refresh ${data}`];
        setItems(_items);
        console.log(items);
      });
  };

  const [items, setItems] = useState({
    templates: getItems("templates"),
    media: [getItems("media")],
  });

  const allContexts = {
    itemActions: {
      play: (command) => {
        handleSendToServer(
          "CG " +
            command.channel +
            "-" +
            command.layer +
            " ADD 1 " +
            command.template +
            " 1 " +
            '"' +
            dyTagHandler(command.dyTags) +
            '"'
        );
      },
      next: (command) => {
        console.log("NEXT FUNCTION");
      },
      update: (command) => {
        handleSendToServer(
          "CG " +
            command.channel +
            "-" +
            command.layer +
            " UPDATE 1 " +
            '"' +
            dyTagHandler(command.dyTags) +
            '"'
        );
        console.log("Test update", command);
      },
      stop: (command) => {
        handleSendToServer(
          "CG " + command.channel + "-" + command.layer + " STOP 1 "
        );
        console.log("Test stop", command);
      },
      custom: (command) => {
        handleSendToServer(command);
      },
    },
    api: configData.api,
    defaultChannel: 1,
    defaultLayer: 20,
    channelMax: channels,
    handleSave: handleSaveToPC,
    items: items,
    getItems: getItems,
  };

  return (
    <UserContext.Provider value={allContexts}>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<MainSection />} />
          {/* <Route path="/RundownSelector" element={<RundownSelector />} /> */}
        </Routes>
        <Footer channels={channels} />
      </Router>
    </UserContext.Provider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
