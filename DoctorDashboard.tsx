import React from 'react';

const DoctorDashboard: React.FC = () => (
  <div className="container py-5">
    {/* Dashboard Navigation */}
    <nav className="mb-4">
      <ul className="nav nav-pills">
        <li className="nav-item">
          <a className="nav-link" href="/user-dashboard">User Dashboard</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="/doctor-dashboard">Doctor Dashboard</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/admin-dashboard">Admin Dashboard</a>
        </li>
      </ul>
    </nav>
    <h2 className="mb-4">Doctor Dashboard</h2>
    <div className="card mb-4 p-4 shadow-sm">
      <h4>Profile & License</h4>
      {/* Doctor profile and uploaded license info here */}
    </div>
    <div className="card mb-4 p-4 shadow-sm">
      <h4>Prescription Management</h4>
      {/* Prescription upload and management UI here */}
    </div>
    <div className="card p-4 shadow-sm">
      <h4>Patient List</h4>
      {/* List of patients assigned to doctor */}
    </div>
  </div>
);

export default DoctorDashboard;
