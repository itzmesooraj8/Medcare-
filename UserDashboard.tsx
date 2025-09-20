import React, { useState } from 'react';

const initialProfile = {
  name: 'Demo User',
  email: 'demo@medcare.com',
  age: 30,
  address: '123 Main St, City',
};
const initialHistory = [
  { id: 1, drug: 'Aspirin', dosage: '325mg', date: '2025-09-01' },
  { id: 2, drug: 'Metformin', dosage: '500mg', date: '2025-08-15' },
];

const UserDashboard: React.FC = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const [history] = useState(initialHistory);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const handleSaveProfile = () => {
    setEditing(false);
  };
  const handlePayBill = () => {
    setPaymentStatus('Payment successful!');
    setPaymentAmount('');
    setTimeout(() => setPaymentStatus(''), 2000);
  };

  return (
    <div className="container py-5">
      {/* Dashboard Navigation */}
      <nav className="mb-4">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a className="nav-link active" href="/user-dashboard">User Dashboard</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/doctor-dashboard">Doctor Dashboard</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/admin-dashboard">Admin Dashboard</a>
          </li>
        </ul>
      </nav>
      <h2 className="mb-4">User Dashboard</h2>
      <div className="card mb-4 p-4 shadow-sm">
        <h4>Profile</h4>
        {editing ? (
          <div className="row g-3">
            <div className="col-md-6">
              <label>Name</label>
              <input className="form-control" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
            </div>
            <div className="col-md-6">
              <label>Email</label>
              <input className="form-control" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
            </div>
            <div className="col-md-6">
              <label>Age</label>
              <input className="form-control" type="number" value={profile.age} onChange={e => setProfile({ ...profile, age: Number(e.target.value) })} />
            </div>
            <div className="col-md-6">
              <label>Address</label>
              <input className="form-control" value={profile.address} onChange={e => setProfile({ ...profile, address: e.target.value })} />
            </div>
            <div className="col-12 mt-3">
              <button className="btn btn-success me-2" onClick={handleSaveProfile}>Save</button>
              <button className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Age:</strong> {profile.age}</p>
            <p><strong>Address:</strong> {profile.address}</p>
            <button className="btn btn-primary mt-2" onClick={() => setEditing(true)}>Edit Profile</button>
          </div>
        )}
      </div>
      <div className="card mb-4 p-4 shadow-sm">
        <h4>Medicine History</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Drug</th>
              <th>Dosage</th>
            </tr>
          </thead>
          <tbody>
            {history.map(item => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.drug}</td>
                <td>{item.dosage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card p-4 shadow-sm">
        <h4>Bill Payment</h4>
        <div className="mb-3">
          <label>Amount</label>
          <input className="form-control" type="number" value={paymentAmount} onChange={e => setPaymentAmount(e.target.value)} />
        </div>
        <button className="btn btn-success" onClick={handlePayBill} disabled={!paymentAmount}>Pay Bill</button>
        {paymentStatus && <div className="alert alert-success mt-3">{paymentStatus}</div>}
      </div>
    </div>
  );
};

export default UserDashboard;
