import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerPatient } from '../../redux/patients/patientThunk';

function RegisterPage() {
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    email: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(registerPatient(userInfo));
    setUserInfo({
      username: '',
      password: '',
      email: '',
    });

    navigate('/');
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="w-50 border p-4 d-flex flex-column align-items-center justify-content-center gap-4">
        <h1>Register</h1>
        <form onSubmit={handleSubmit} className='d-flex flex-column align-items-center justify-content-center'>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={userInfo.username}
                onChange={handleChange}
                placeholder='Username'
              />
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                value={userInfo.email}
                onChange={handleChange}
                placeholder='Email'
              />
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              <input
                type="password"
                name="password"
                className="form-control"
                id="password"
                value={userInfo.password}
                onChange={handleChange}
                placeholder='Password'
              />
            </label>
          </div>
          <div className="mb-3" style={{ width: '100%' }}>
            <button type="submit" className="btn btn-success" style={{ width: '100%' }}>
              Register
            </button>
          </div>
          <div className="mb-3" style={{ width: '100%' }}>
            <Link to="/" className="btn btn-primary" style={{ width: '100%' }}>Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
