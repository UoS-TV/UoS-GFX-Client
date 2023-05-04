import "bootstrap/dist/css/bootstrap.min.css";

import { createRoot } from "react-dom/client";

import React, { useState, useEffect } from "react";

import axios from "axios";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/old/Header";
import MainSection from "./components/old/MainSection";
import Footer from "./components/Footer";

import { UserContext } from "./components/context";

import config from "./config.json";
import FileSaver from "file-saver";
import { Button, Container, Navbar } from "react-bootstrap";
import CustomColumn from "./components/CustomColumn";

const channels = config.channels;

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
  const [commandBox, setCommandBox] = useState({ last: "", response: "" });

  const [items, setItems] = useState({
    templates: [],
    media: [],
  });

  const handleSendToServer = (data) => {
    console.log(data);
    axios
      .post("http://localhost:3001/data", { data: data })
      .then((response) => {
        console.log(response.data);
        let _commandBox = commandBox;
        _commandBox.last = data;
        _commandBox.response = response.data;
        setCommandBox(_commandBox); //THIS DOES WEIRD STUFF AND TRIGGERS ANOTHER FUNTION
        console.log(commandBox);
      });
  };

  const getItems = () => {
    axios
      .post("http://localhost:3001/filegetter")
      .then((response) => {
        var _items = items;
        _items = response.data;
        setItems(_items);
        console.log("Response: ", response.data);
      })
      .catch((error) => {
        var _items = items;
        console.log("got errr while posting data", error);
        _items = [`Start server link and refresh`];
        setItems(_items);
      });
  };

  // get library file on page load, don't get on re-render of component
  useEffect(() => {
    let ignore = false;

    if (!ignore) getItems();
    return () => {
      ignore = true;
    };
  }, []);

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
      },
      stop: (command) => {
        handleSendToServer(
          "CG " + command.channel + "-" + command.layer + " STOP 1 "
        );
      },
      custom: (command) => {
        handleSendToServer(command);
      },
    },
    api: config.api,
    defaultChannel: 1,
    defaultLayer: 20,
    channelMax: channels,
    handleSave: handleSaveToPC,
    items: items,
  };

  return (
    <UserContext.Provider value={allContexts}>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">UoS Caspar Client</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* <Nav className="me-auto"> */}
            {/* <Nav.Link href="/">Home</Nav.Link> */}
            {/* <Nav.Link href="/RundownSelector">Rundown Selector</Nav.Link> */}
            {/* </Nav> */}
          </Navbar.Collapse>
          <Button variant="outline-info" size="sm" onClick={getItems}>
            Refresh Library
          </Button>
          {/* <BsFillGearFill variant="primary" onClick={handleShow} />
        <ConfigModal isModalVisible={show} handleShow={() => setShow(false)} /> */}
        </Container>
      </Navbar>
      <Container>
        <CustomColumn />
      </Container>
      <Footer channels={channels} command={commandBox} />
    </UserContext.Provider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
