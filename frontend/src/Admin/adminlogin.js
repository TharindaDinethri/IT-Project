import React, { useState } from 'react';
import Dashboard from './dashboard'; 
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (username === 'admin' && password === '123') {
      setIsLoggedIn(true); 
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center mt-5">
        <div className="">
          {isLoggedIn ? ( 
            <Dashboard />
          ) : (
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Admin Login</h2>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary mt-3 w-100" onClick={handleLogin}>Login</button>
                {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
