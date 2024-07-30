import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { GuestGuard } from './auth/guard';
import AuthClassicLayout from './components/Auth/classic';
import  LoginPage from './components/Auth/Login';
import RegisterPage from './components/Auth/Register';
import './App.css';
import Dashboard from './components/dashboard/dashboard';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
      <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path="/" element={<><GuestGuard>
          <AuthClassicLayout>
            <LoginPage />
          </AuthClassicLayout>
        </GuestGuard></>} />
        <Route path="/register" element={<GuestGuard>
          <AuthClassicLayout title="Manage the job more effectively with App">
          <RegisterPage/>
          </AuthClassicLayout>
        </GuestGuard>} />
      </Routes>
    </div>
  );
};

export default App;
