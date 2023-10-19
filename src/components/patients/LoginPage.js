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
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={userInfo.username}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={userInfo.password}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={userInfo.password}
              onChange={handleChange}
            />
          </label>
        </div>

        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary"
        >
          Login
        </button>
        <Link to="/register">Sign up</Link>
      </form>
    </div>
  );
}

export default LoginPage;
