import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CallOperatorDashboard from './CallOperatorDashboard';
import AddPassenger from './AddPassenger';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/CallOperatorDashboard" element={<CallOperatorDashboard />} />
        <Route path="/AddPassenger" element={<AddPassenger />} />
      </Routes>
    </Router>
  );
}

export default App;