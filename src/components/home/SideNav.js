import React from 'react';
import { Link } from 'react-router-dom';
import getDocLogo from '../../assets/getdoc.png';
import '../../App.css';

function SideNav() {
  return (
    <div className="d-flex flex-column align-items-center border border-top-0 border-bottom-0 border-start-0 bg-white" style={{ minHeight: '100vh', width: '20vw' }}>
      <img src={getDocLogo} alt="getDocLogo" className="img-fluid my-4" style={{ maxWidth: '40%' }} />
      <ul className="list-group border-0 pl-2 d-flex flex-column bg-white" style={{ width: '100%' }}>
        <li className="list-group-item border-0 w-full fw-bold d-flex justify-content-left">
          <Link to="/home" className="link text-decoration-none align-self-start">DOCTORS</Link>
        </li>
        <li className="list-group-item custom-link border-0 fw-bold d-flex">
          <Link to="/appointments" className="text-decoration-none align-self-start">MY APPOINTMENTS</Link>
        </li>
        <li className="list-group-item custom-link border-0 fw-bold d-flex">
          <Link to="/appointments/new" className="text-decoration-none align-self-start">MAKE APPOINTMENTS</Link>
        </li>
        <li className="list-group-item custom-link border-0 fw-bold d-flex">
          <Link to="/doctors/new" className="text-decoration-none align-self-start">ADD DOCTOR</Link>
        </li>
        <li className="list-group-item custom-link border-0 fw-bold d-flex">
          <Link to="/doctors/delete" className="text-decoration-none align-self-start">DELETE DOCTOR</Link>
        </li>
        <button type="button" className="logout list-group-item custom-link border-0 fw-bold d-flex">
          <Link to="/" className="text-decoration-none align-self-start btn btn-danger">LOG OUT</Link>
        </button>
      </ul>
    </div>
  );
}

export default SideNav;
