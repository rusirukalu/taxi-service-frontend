import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import React from'react';
import './App.css';
import DriverLogin from './Pages/DriverPages/DriverLogin';
import Home from './Pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import DriverRegister from './Pages/DriverPages/DriverRegister';
import DriverDashboard from './Pages/DriverPages/DriverDashboard';
import PassengerLogin from './Pages/PassengerPages/PassengerLogin';
import PassengerRegister from './Pages/PassengerPages/PassengerRegister';
import PassengerDashboard from './Pages/PassengerPages/PassengerDashboard';



function App() {
  
  return (
    
    <div className="App">
      <BrowserRouter>
      <Routes>     
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Home" element={<Home/>}></Route>
        <Route path="/DriverLogin" element={<DriverLogin/>}></Route>
        <Route path="/DriverRegister" element={<DriverRegister/>}></Route>
        <Route path="/DriverDashboard" element={<DriverDashboard/>}></Route>
        <Route path="/PassengerLogin" element={<PassengerLogin/>}></Route>
        <Route path="/PassengerRegister" element={<PassengerRegister/>}></Route>
        <Route path="/PassengerDashboard" element={<PassengerDashboard />}></Route> 
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
