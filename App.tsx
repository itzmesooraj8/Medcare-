import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginRegister from './components/LoginRegister';
import { PrescriptionInput } from './components/PrescriptionInput';
import { PatientManagement } from './components/PatientManagement';
import { SafetyDashboard } from './components/SafetyDashboard';

function App() {

  // Simulated authentication state (replace with real auth logic)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  // Handler for login (replace with real backend logic)
  const handleLogin = (userRole: string) => {
    setIsAuthenticated(true);
    setRole(userRole);
  };

  // Demo/mock props for prototype routing
  const demoPatient = {
    id: 'demo',
    name: 'Demo User',
    age: 30,
    weight: 70,
    allergies: [],
    medicalHistory: [],
    currentMedications: []
  };
  const demoPatients = [demoPatient];
  const noop = () => {};

  // Navigation page for demo
  const NavigationPage = () => {
    const navigate = useNavigate();
    return (
      <div className="container py-5 text-center">
        <h2 className="mb-4">Navigation Demo</h2>
        <div className="d-flex justify-content-center gap-4 mb-5">
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/prescription')}>User Dashboard</button>
          <button className="btn btn-info btn-lg" onClick={() => navigate('/patients')}>Doctor Dashboard</button>
          <button className="btn btn-dark btn-lg" onClick={() => navigate('/safety')}>Admin Dashboard</button>
        </div>
        <p className="text-muted">Use these buttons to quickly navigate and demo each dashboard role.</p>
      </div>
    );
  };

  return (
    <Router>
      <Routes>
  <Route path="/navigate" element={<NavigationPage />} />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              role === 'user' ? <Navigate to="/prescription" /> :
              role === 'doctor' ? <Navigate to="/patients" /> :
              role === 'admin' ? <Navigate to="/safety" /> :
              <Navigate to="/login" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={<LoginRegister onLogin={handleLogin} />}
        />
        <Route
          path="/prescription"
          element={isAuthenticated && role === 'user' ? (
            <PrescriptionInput patient={demoPatient} onPatientChange={noop} onAnalyze={noop} />
          ) : <Navigate to="/login" />}
        />
        <Route
          path="/patients"
          element={isAuthenticated && role === 'doctor' ? (
            <PatientManagement patients={demoPatients} onAddPatient={noop} onSelectPatient={noop} />
          ) : <Navigate to="/login" />}
        />
        <Route
          path="/safety"
          element={isAuthenticated && role === 'admin' ? <SafetyDashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;