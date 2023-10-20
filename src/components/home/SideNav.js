import React from 'react';
import { Link } from 'react-router-dom';
import getDocLogo from '../../assets/getdoc.png';
import '../../App.css';

function SideNav() {
  return (
    <div className="d-flex flex-column ">
      <img src={getDocLogo} alt="getDocLogo" className="img-fluid my-4" style={{ maxWidth: '40%' }} />
      <ul className="list-group text-center border-0 mt-1">
        <li className="li-cont list-group-item border-0 pl-2 fw-bold d-flex">
          <Link to="/home" className="link text-decoration-none align-self-start">DOCTORS</Link>
        </li>
        <li className="list-group-item custom-link border-0 pl-2 fw-bold d-flex">
          <Link to="/appointments" className="text-decoration-none align-self-start">MY APPOINTMENTS</Link>
        </li>
        <li className="list-group-item custom-link border-0 pl-2 fw-bold d-flex">
          <Link to="/appointments/new" className="text-decoration-none align-self-start">MAKE APPOINTMENTS</Link>
        </li>
        <li className="list-group-item custom-link border-0 pl-2 fw-bold d-flex">
          <Link to="/doctors/new" className="text-decoration-none align-self-start">ADD DOCTOR</Link>
        </li>
        <li className="list-group-item custom-link border-0 pl-2 fw-bold d-flex">
          <Link to="/doctors/delete" className="text-decoration-none align-self-start">DELETE DOCTOR</Link>
        </li>
        <li className="list-group-item custom-link border-0 pl-2 fw-bold d-flex">
          <Link to="/" className="text-decoration-none align-self-start">LOG OUT</Link>
        </li>
      </ul>
    </div>
  );
}

export default SideNav;
