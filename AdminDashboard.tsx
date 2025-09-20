import React, { useState } from 'react';
import { SafetyDashboard } from './SafetyDashboard';

const AdminDashboard: React.FC = () => {
  const [revenue] = useState([
    { month: 'May', amount: 12000 },
    { month: 'June', amount: 14500 },
    { month: 'July', amount: 13200 },
    { month: 'August', amount: 15800 },
    { month: 'September', amount: 16750 },
  ]);
  const [adminSetting, setAdminSetting] = useState('');
  const [saveStatus, setSaveStatus] = useState('');

  const handleSaveSetting = () => {
    setSaveStatus('Settings saved!');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  return (
    <div className="container py-5">
      {/* Dashboard Navigation */}
      <nav className="mb-4">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a className="nav-link" href="/user-dashboard">User Dashboard</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/doctor-dashboard">Doctor Dashboard</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" href="/admin-dashboard">Admin Dashboard</a>
          </li>
        </ul>
      </nav>
      <h2 className="mb-4">Admin Dashboard</h2>
      <div className="card mb-4 p-4 shadow-sm">
        <h4>Safety Dashboard</h4>
        <SafetyDashboard />
      </div>
      <div className="card mb-4 p-4 shadow-sm">
        <h4>Revenue & Analytics</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Month</th>
              <th>Revenue (₹)</th>
            </tr>
          </thead>
          <tbody>
            {revenue.map((r, idx) => (
              <tr key={idx}>
                <td>{r.month}</td>
                <td>{r.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card p-4 shadow-sm">
        <h4>Admin Controls</h4>
        <div className="mb-3">
          <label>System Setting</label>
          <input className="form-control" value={adminSetting} onChange={e => setAdminSetting(e.target.value)} placeholder="Enter setting value" />
        </div>
        <button className="btn btn-primary" onClick={handleSaveSetting}>Save Settings</button>
        {saveStatus && <div className="alert alert-success mt-3">{saveStatus}</div>}
      </div>
    </div>
  );
};

export default AdminDashboard;
