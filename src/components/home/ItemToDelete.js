import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../App.css';

const ItemToDelete = ({
  name, specialization,
}) => (

  <div className="home_item">
    <Link to="/doctor/details" className="text-decoration-none secondary-link">
      <h5>
        {name}
        ,
        <span className="specialization">
          {specialization}
        </span>
      </h5>
    </Link>
  </div>

);

ItemToDelete.propTypes = {
  name: PropTypes.string.isRequired,
  specialization: PropTypes.string.isRequired,
};

export default ItemToDelete;
