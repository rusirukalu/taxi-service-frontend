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
import CallOperatorLogin from './Pages/CallOperator/CallOperatorLogin';
import RideBooking from './Pages/CallOperator/RideBooking';  
import { createRoot } from 'react-dom/client';
import theme from './theme';
import CallOperatorDashboard from './Pages/CallOperator/CallOperatorDashboard';
import AddPassenger from './Pages/CallOperator/AddPassenger';

// Get the root DOM element
const rootElement = document.getElementById('root');

// Create the root and render the application
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

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
        <Route path="/CallOperatorLogin" element={<CallOperatorLogin />}></Route>
        <Route path="/RideBooking" element={<RideBooking />}></Route>
        <Route path="/CallOperatorDashboard" element={<CallOperatorDashboard />}></Route>
        <Route path="/AddPassenger" element={<AddPassenger />}></Route>
        

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
