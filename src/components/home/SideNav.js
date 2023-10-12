import React from 'react';
import { Link } from 'react-router-dom';

function SideNav() {
  return (

    <div>
      <ul>
        <li className="custom-link">
          <Link to="/" className="custom-link">DOCTORS</Link>
        </li>
        <li className="custom-link">
          <Link to="/appointments" className="custom-link">MY APPOINTMENTS</Link>
        </li>
        <li className="custom-link">
          <Link to="/appointments/new" className="custom-link">MAKE APPOINTMENTS</Link>
        </li>
        <li className="custom-link">
          <Link to="/doctors/new" className="custom-link">ADD DOCTOR</Link>
        </li>
        <li className="custom-link">
          <Link to="/doctors/delete" className="custom-link">DELETE DOCTOR</Link>
        </li>
      </ul>
    </div>

  );
}
export default SideNav;
