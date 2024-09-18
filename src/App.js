import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import React from'react';
import './App.css';
import DriverLogin from './Pages/DriverPages/DriverLogin';
import Home from './Pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import DriverRegister from './Pages/DriverPages/DriverRegister';



function App() {
  
  return (
    
    <div className="App">
      <BrowserRouter>
      <Routes>     
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Home" element={<Home/>}></Route>
        <Route path="/DriverLogin" element={<DriverLogin/>}></Route>
        <Route path="/DriverRegister" element={<DriverRegister/>}></Route>
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
