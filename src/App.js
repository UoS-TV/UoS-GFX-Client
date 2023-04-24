import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import MainSection from "./components/MainSection";
import RundownSelector from "./components/RundownSelector";

import Footer from "./components/Footer";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<MainSection />} />
          <Route path="/RundownSelector" element={<RundownSelector />} />
        </Routes>
        <Footer />
      </Router>
    );
  }
}

export default App;
