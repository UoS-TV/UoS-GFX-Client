import Header from "./components/Header";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";

import MainSection from "./components/MainSection";
import Footer from "./components/Footer";
import RundownSelector from "./components/RundownSelector";
import API from "./components/api";


import React from 'react'
import Child from './components/child'


class App extends React.Component{
      
       
// function App() {

handleCallback = (childData) =>{
   this.setState({name: childData})
}

state = {
   name: "",
  }
render(){
const {name} = this.state;
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<MainSection />} />
        <Route path="/RundownSelector" element={<RundownSelector parentCallback = {this.handleCallback}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/API" element={<API />} />
      </Routes>
      <div>
                {/* <Child parentCallback = {this.handleCallback}/> */}
                {name}
            </div>
      <Footer />
    </Router>
  );
}}

export default App;
