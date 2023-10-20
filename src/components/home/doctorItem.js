// DoctorItem.js
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const DoctorItem = ({
  itemid, name, timestart, timeend,
}) => {
  // Extract only the hours from the time strings
  const startTime = timestart.slice(11, 16); // Assuming format is HH:mm
  const endTime = timeend.slice(11, 16);

  return (
    <div className="d-flex flex-column align-items-center border-2 rounded p-3 bg-success-subtle gap-2">
      <Link to={`/doctors/details/${itemid}`}>
        <img
          src="https://picsum.photos/200/200" // Adjust image source and dimensions
          alt="Doctor"
          className="rounded border-2"
          style={{width: '15.5rem'}}
        />
      </Link>
      <h5 className='text-secondary'>{name}</h5>
      <p className='text-success fw-bold'>Start Time: {startTime}</p>
      <p className='text-danger fw-bold'>End Time: {endTime}</p>
    </div>
  );
};

DoctorItem.propTypes = {
  itemid: PropTypes.number.isRequired,
  timestart: PropTypes.string.isRequired,
  timeend: PropTypes.string.isRequired,
};

export default DoctorItem;
