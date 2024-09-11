import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import React from'react';
import './App.css';
import DriverLogin from './Pages/DriverLogin';
import Home from './Pages/Home';

function App() {
  
  return (
    
    <div className="App">
      <BrowserRouter>
      <Routes>     
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Home" element={<Home/>}></Route>
        <Route path="/DriverLogin" element={<DriverLogin/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
