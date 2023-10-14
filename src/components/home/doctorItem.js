import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

const HomeItem = ({
  name, specialization, timestart, timeend,
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
    <p>{timestart}</p>
    <p>End</p>
    <p>{timeend}</p>
  </div>

);

HomeItem.propTypes = {
  name: PropTypes.string.isRequired,
  specialization: PropTypes.string.isRequired,
  timestart: PropTypes.string.isRequired,
  timeend: PropTypes.string.isRequired,
};

export default HomeItem;
