import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Rundown from './Rundown';
import TextPage from './TextPage';
import Footer from './Footer';
import './App.css'

function App() {
  return (
    <Router>
      <div className='app'>
        <Navbar bg="light" expand="lg" className="sticky-top">
          <Container fluid>
            <Navbar.Brand>
              <Image src={logo} alt="Logo" height="40" />
              <span className="ms-2">CasparCG Graphics Client</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <a href="/" className="nav-link">Rundown</a>
              <a href="/text" className="nav-link">Text Page</a>
              {/* Add links to other pages as needed */}
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="content-container"> {/* Apply the content container class */}
          <Routes>
            <Route path="/" element={<Rundown />} />
            <Route path="/text" element={<TextPage />} />
            {/* Add routes to other pages as needed */}
          </Routes>
        </div>
        <Footer className="footer"/>
      </div>
    </Router>
  );
}

export default App;
