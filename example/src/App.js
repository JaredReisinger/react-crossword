import React from 'react';
import logo from './logo.svg';
import Crossword from '@jaredreisinger/react-crossword';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Crossword data={data} />
      </header>
    </div>
  );
}

export default App;
