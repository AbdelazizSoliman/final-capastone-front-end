import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchDoctors from '../../redux/thunk';
import HomeItem from './homeItem';
import './home.css';

const Home = () => {
  // const slideLeft = () => {
  //   const slider = document.getElementById('slider');
  //   slider.scrollLeft -= 500;
  // };

  // const slideRight = () => {
  //   const slider = document.getElementById('slider');
  //   slider.scrollLeft += 500;
  // };

  const dispatch = useDispatch();

  const doctorsArray = useSelector((state) => state.doctors.doctors);

  useEffect(() => {
    if (doctorsArray.length === 0) {
      dispatch(fetchDoctors());
    }
  }, [dispatch, doctorsArray]);
  return (

    <div className="home_component" id="slider">
      <div className="flex"><i className="fa fa-chevron-left" style={{ fontSize: '2em', color: '#25c804' }} /></div>
      <div className="slideshowSlider">
        {doctorsArray.map((doctor) => (
          <HomeItem
            key={doctor.id}
            name={doctor.name}
          />
        ))}
      </div>
      <div className="flex"><i className="fa fa-chevron-right" style={{ fontSize: '2em', color: '#25c804' }} /></div>
    </div>

  );
};

export default Home;
