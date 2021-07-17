import React, { Component } from 'react'
import Home from './containers/Home';
import './App.css';
import AppRouter from './config/Router';
export class App extends Component {
  render() {
    return (
      <div className="App">
        <AppRouter />
      </div>
    )
  }
}

export default App
