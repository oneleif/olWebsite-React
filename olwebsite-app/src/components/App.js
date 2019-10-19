import React from 'react';

import '../styles/App.css';

import Header from './Header';
import Footer from './Footer';
import CarouselWrapper from './CarouselWrapper';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="App-header">
        <CarouselWrapper/>
      </div>
      <Footer/>
    </div>
  )
}

export default App;
