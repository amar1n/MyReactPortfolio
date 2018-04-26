import React, { Component } from 'react';
import '../node_modules/hammerjs/hammer.min.js';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize.min.js';

import './App.css';

import NavBar from './components/navbar';
import LandingPage from './components/landing_page';
import Work from './components/works';
import About from './components/about';
import Skills from './components/skills';
import Courses from './components/courses';
import Footer from './components/footer';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <LandingPage />
        <Work />
        <About />
        <Skills />
        <Courses />
        <Footer />
      </div>
    );
  }
}

export default App;
