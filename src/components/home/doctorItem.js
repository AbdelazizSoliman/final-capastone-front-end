import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

const HomeItem = ({
  name, specialization, time_start, time_end,
}) => (

  <div className="home_item">
    <Link to="/doctor/details">
      <img src="https://picsum.photos/1000/1000" alt="Error" width="80%" />
      <h5>
        {name}
      </h5>
    </Link>
    <p>{specialization}</p>
    <p>Start</p>
    <p>{time_start}</p>
    <p>End</p>
    <p>{time_end}</p>
  </div>

);

HomeItem.propTypes = {
  name: PropTypes.string.isRequired,
  specialization: PropTypes.string.isRequired,
  time_start: PropTypes.string.isRequired,
  time_end: PropTypes.string.isRequired,
};

export default HomeItem;
