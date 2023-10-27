import { React, useState } from "react";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import logo from "./logo.png";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Rundown from "./components/Rundown";
import TextPage from "./TextPage";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  const [casparSent, setCasparSent] = useState("");
  const [casparResponse, setCasparResponse] = useState("");

  const formatTags = (data) => {
    // Convert the dynamic tags array to the desired format
    const formattedTags = data.reduce((acc, tag) => {
      acc[tag.id] = tag.text;
      return acc;
    }, {});

    const formattedTagsString = JSON.stringify(formattedTags).replace(
      /"/g,
      '\\"'
    );
    const finalString = ` "${formattedTagsString}"`;
    return finalString;
  };

  const casparSend = (command) => {
    setCasparSent(command);
    console.log(command);
    axios
      .post("http://localhost:3002/data", { data: command })
      .then((response) => {
        console.log(response.data);
        setCasparResponse(response.data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const casparCommands = {
    cgPlay: (command) => {
      casparSend(
        "CG " +
          command.channel +
          "-" +
          command.layer +
          " ADD 1 " +
          command.selectedTemplate +
          " 1 " +
          '"' +
          formatTags(command.tags) +
          '"'
      );
    },
    cgNext: (command) => {
      casparSend("CG " + command.channel + "-" + command.layer + " NEXT ");
    },
    cgUpdate: (command) => {
      casparSend(
        "CG " +
          command.channel +
          "-" +
          command.layer +
          " UPDATE 1 " +
          '"' +
          formatTags(command.tags) +
          '"'
      );
    },
    cgStop: (command) => {
      casparSend("CG " + command.channel + "-" + command.layer + " STOP 1");
    },
    play: (command) => {
      casparSend(
        "PLAY " +
          command.channel +
          "-" +
          command.layer +
          ' "' +
          command.selectedMedia +
          '"'
      );
    },
    load: (command) => {
      casparSend(
        "LOAD " +
          command.channel +
          "-" +
          command.layer +
          ' "' +
          command.selectedMedia +
          '"'
      );
    },
    pause: (command) => {
      casparSend("PAUSE " + command.channel + "-" + command.layer);
    },
    stop: (command) => {
      casparSend("STOP " + command.channel + "-" + command.layer);
    },
    custom: (command) => {
      casparSend(command)
    },
    sent: casparSent,
    response: casparResponse,
  };

  return (
    <Router>
      <div className="app">
        <Navbar bg="light" expand="lg" className="sticky-top">
          <Container>
            <Navbar.Brand>
              <Image src={logo} alt="Logo" height="40" />
              <span className="ms-2">CasparCG Graphics Client</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <a href="/" className="nav-link">
                Rundown
              </a>
              {/* <a href="/text" className="nav-link">Text Page</a> */}
              {/* Add links to other pages as needed */}
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="content-container">
          {" "}
          {/* Apply the content container class */}
          <Routes>
            <Route
              path="/"
              element={<Rundown casparCommands={casparCommands} />}
            />
            <Route path="/text" element={<TextPage />} />
            {/* Add routes to other pages as needed */}
          </Routes>
        </div>
        <Footer
          className="footer"
          casparCommands={casparCommands}
        />
      </div>
    </Router>
  );
};

export default App;
