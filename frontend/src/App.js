import logo from './logo.svg';
import './App.css';


import React,{ useState } from 'react';
import Navigator from './Navigation/Navigator';
import AppHeader from './AppHeader';
import { Button, Popover } from 'antd';

function App() {
  


  return (
    <div className="App">
      <AppHeader/>
      <Navigator />
    </div>
  );
}

export default App;
