import React from 'react';

import '../styles/App.css';
import homeLogo from '../images/homeLogo.png';

import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="App-header">
        <img src={homeLogo} className="App-logo" alt="logo" />
      </div>
      <Footer/>
    </div>
  )
}

export default App;
