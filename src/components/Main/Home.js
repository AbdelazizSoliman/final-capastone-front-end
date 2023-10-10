import React from 'react';
import { Link } from 'react-router-dom';

const home = () => (
  <div>
    <nav>
      <Link to="/doctors">Doctors</Link>
      <Link to="/appointments">Appointments</Link>
      <Link to="/addnewdoctor">Add doctor</Link>
      <Link to="/deletedoctor">Delete doctor</Link>
      <Link to="/specializations">Specializations</Link>
    </nav>
  </div>
);

export default home;
