import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

const HomeItem = ({
  name, specialization, timeStart, timeEnd,
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
    <p>{timeStart}</p>
    <p>End</p>
    <p>{timeEnd}</p>
  </div>

);

HomeItem.propTypes = {
  name: PropTypes.string.isRequired,
  specialization: PropTypes.string.isRequired,
  timeStart: PropTypes.string.isRequired,
  timeEnd: PropTypes.string.isRequired,
};

export default HomeItem;
