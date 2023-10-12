import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

const HomeItem = ({
  name,
}) => (

  <div className="home_item">
    <Link to="/doctor/details">
      <img src="https://picsum.photos/1000/1000" alt="" width="100%" />
      <h5>
        {name}
      </h5>
    </Link>
    <p>Test tex</p>
  </div>

);

HomeItem.propTypes = {
  name: PropTypes.string.isRequired,
};

export default HomeItem;
