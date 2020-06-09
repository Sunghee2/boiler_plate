import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [password, setPassword] = useState('');
  useEffect(() => {
    axios.get('/test/ungmo2').then((response) => {
      console.log(response);
      console.log(response.data.data[0].password);
      if (response.data.success) {
        setPassword(response.data.data[0].password);
      }
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {password}
      </header>
    </div>
  );
}

export default App;
