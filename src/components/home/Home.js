import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchDoctors from '../../redux/thunk';
import HomeItem from './homeItem';
import './home.css';

const Home = () => {
  const slideLeft = () => {
    const slider = document.getElementById('slider');
    slider.scrollLeft -= 500;
  };

  const slideRight = () => {
    const slider = document.getElementById('slider');
    slider.scrollLeft += 500;
  };

  const dispatch = useDispatch();

  const doctorsArray = useSelector((state) => state.doctors.doctors);

  useEffect(() => {
    if (doctorsArray.length === 0) {
      dispatch(fetchDoctors());
    }
  }, [dispatch, doctorsArray]);
  return (

    <div className="home_component">
      <button type="button" aria-label="Slide left" className="flex" onClick={slideLeft}><i className="fa fa-chevron-left" style={{ color: '#25c804' }} /></button>
      <div className="slideshowSlider" id="slider">
        {doctorsArray.map((doctor) => (
          <HomeItem
            key={doctor.id}
            name={doctor.name}
            specialization={doctor.specialization.name}
            timestart={doctor.time_start}
            timeend={doctor.time_end}
          />
        ))}
      </div>
      <button type="button" aria-label="Slide left" className="flex" onClick={slideRight}><i className="fa fa-chevron-right" style={{ color: '#25c804' }} /></button>
    </div>

  );
};

export default Home;
