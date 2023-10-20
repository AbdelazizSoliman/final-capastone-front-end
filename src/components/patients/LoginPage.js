import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginPatient } from '../../redux/patients/patientThunk';

function LoginPage() {
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginPatient(userInfo));
    navigate('/home');
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="w-50 border p-4 d-flex flex-column align-items-center justify-content-center gap-4">
        <h1>Login</h1>
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
            <label htmlFor="password" className="form-label">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={userInfo.password}
                onChange={handleChange}
                placeholder='Password'
              />
            </label>
          </div>
          <div className="mb-3" style={{width: '100%'}}>
            <button type="submit" className="btn btn-success" style={{width: '100%'}}>
              Login
            </button>
          </div>
          <div className="mb-3" style={{width: '100%'}}>
            <Link to="/register" className="btn btn-primary" style={{width: '100%'}}>Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
