import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import DriverLogin from './Pages/DriverLogin';
import Home from './Pages/Home';
import PassengerLogin from './Pages/PassengerLogin';
import PassengerRegister from './Pages/PassengerPages/PassengerRegister';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/DriverLogin" element={<DriverLogin />} />
          <Route path="/PassengerLogin" element={<PassengerLogin />} />
          <Route path="/PassengerRegistration" element={<PassengerRegister/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
