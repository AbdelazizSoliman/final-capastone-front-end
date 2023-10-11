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
          <Link to="/" className="custom-link">MY APPOINTMENTS</Link>
        </li>
        <li className="custom-link">
          <Link to="/" className="custom-link">MAKE APPOINTMENTS</Link>
        </li>
      </ul>
    </div>

  );
}
export default SideNav;
