import React from 'react';
import './App.css';

import Header from './components/Header';
import Signup from './components/Signup';
import About from './components/About';
import Footer from './components/Footer';
import Gallery from './components/Gallery';


function App() {
  return (
    <div className="app-root">
      <Header />
       <Gallery />
      <Signup />
      <About />
      <Footer />
     
    </div>
  );
}

export default App;
