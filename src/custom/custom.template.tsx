import React from 'react';
import logo from '../logo.svg';
import { Slot } from '..';
import './custom.style.css';
export function CustomTemplate(props: React.PropsWithoutRef<{}>) {
  return <React.StrictMode>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div><Slot {...props} /></div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      
    </div>
  </React.StrictMode>
}