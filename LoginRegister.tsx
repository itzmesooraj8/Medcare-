import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Tabs, Tab } from 'react-bootstrap';

interface LoginRegisterProps {
  onLogin?: (role: 'user' | 'doctor' | 'admin') => void;
}

const LoginRegister: React.FC<LoginRegisterProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'user' | 'doctor' | 'admin'>('user');
  const [isLogin, setIsLogin] = useState(true);

  const [demoMsg, setDemoMsg] = useState<string | null>(null);

  const handleDemoLogin = () => {
    setDemoMsg(`Logged in as ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} (Demo)`);
    if (isLogin && onLogin) onLogin(activeTab);
    if (isLogin) {
      if (activeTab === 'user') navigate('/prescription');
      else if (activeTab === 'doctor') navigate('/patients');
      else if (activeTab === 'admin') navigate('/safety');
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">
      <h1 className="mb-4 text-primary fw-bold" style={{ letterSpacing: 1, fontSize: '2.5rem' }}>MedCare</h1>
      <Card className="shadow-lg p-4" style={{ minWidth: 400, maxWidth: 420 }}>
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k as 'user' | 'doctor' | 'admin')}
          className="mb-4 nav-pills nav-fill"
        >
          <Tab eventKey="user" title="User" />
          <Tab eventKey="doctor" title="Doctor" />
          <Tab eventKey="admin" title="Admin" />
        </Tabs>
        <div className="mb-3 text-center">
          <Button variant={isLogin ? 'primary' : 'outline-primary'} onClick={() => setIsLogin(true)} className="me-2">Login</Button>
          <Button variant={!isLogin ? 'primary' : 'outline-primary'} onClick={() => setIsLogin(false)}>Register</Button>
        </div>
        {demoMsg && <div className="alert alert-success text-center py-2 mb-2">{demoMsg}</div>}
        <Form>
          {activeTab === 'user' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              {!isLogin && (
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" placeholder="Your Name" />
                </Form.Group>
              )}
              <Button
                variant="success"
                className="w-100 mt-2"
                onClick={handleDemoLogin}
              >
                {isLogin ? 'Login' : 'Register'}
              </Button>
            </>
          )}
          {activeTab === 'doctor' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              {!isLogin && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Your Name" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Upload License/Document</Form.Label>
                    <Form.Control type="file" accept=".pdf,.jpg,.jpeg,.png" />
                  </Form.Group>
                </>
              )}
              <Button
                variant="info"
                className="w-100 mt-2"
                onClick={handleDemoLogin}
              >
                {isLogin ? 'Login' : 'Register'}
              </Button>
            </>
          )}
          {activeTab === 'admin' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Admin Email</Form.Label>
                <Form.Control type="email" placeholder="Enter admin email" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button
                variant="dark"
                className="w-100 mt-2"
                onClick={handleDemoLogin}
              >
                {isLogin ? 'Login' : 'Register'}
              </Button>
            </>
          )}
        </Form>
      </Card>
    </div>
  );
};

export default LoginRegister;
