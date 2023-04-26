import "bootstrap/dist/css/bootstrap.min.css";

import { createRoot } from "react-dom/client";

import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import MainSection from "./components/MainSection";
import Footer from "./components/Footer";

import { UserContext } from "./components/context";

import configData from "./config.json";

const channels = configData.channels;

const App = () => {
  const [commandBox, setCommandBox] = useState("");

  const allContexts = {
    actions: {
      custom: (command) => {
        console.log("let's gooo", command);
        setCommandBox(command);
      },
      play: (command) => {
        console.log("let's gooo", command);
        setCommandBox(command);
      },
    },
    api: configData.api,
    defaultChannel: 1,
    defaultLayer: 20,
    channelMax: channels,
  };

  return (
    <UserContext.Provider value={allContexts}>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<MainSection />} />
          {/* <Route path="/RundownSelector" element={<RundownSelector />} /> */}
        </Routes>
        <Footer value={commandBox} channels={channels} />
      </Router>
    </UserContext.Provider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
