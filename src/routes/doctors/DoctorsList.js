import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '../../redux/doctors/doctorThunk';
import SideNav from '../../components/home/SideNav';
import DoctorItem from '../../components/home/doctorItem';
import './doctor.css';

const Home = () => {
  const dispatch = useDispatch();

  const slideLeft = () => {
    const slider = document.getElementById('slider');
    slider.scrollLeft -= 500;
  };

  const slideRight = () => {
    const slider = document.getElementById('slider');
    slider.scrollLeft += 500;
  };
  const doctorsArray = useSelector((state) => state.doctors.doctors);

  useEffect(() => {
    if (doctorsArray.length === 0 || doctorsArray.length === undefined) {
      dispatch(fetchDoctors());
    }
  }, [dispatch, doctorsArray]);
  return (
    <div className="d-flex align-items-center justify-content-center bg-green">
      <SideNav />
      <div className="home_component">
        <button
          type="button"
          className="flex"
          onClick={slideLeft}
          aria-label="Slide left"
        >
          <i
            className="fa fa-chevron-left"
            style={{ fontSize: '2em', color: '#25c804' }}
          />
        </button>
        <div className="slideshowSlider" id="slider">
          {doctorsArray.map((doctor) => (
            <DoctorItem
              key={doctor.id}
              itemid={doctor.id}
              name={doctor.name}
              specialization={doctor.specialization_name}
              timestart={doctor.time_start}
              timeend={doctor.time_end}
            />
          ))}
        </div>
        <button
          type="button"
          className="flex"
          onClick={slideRight}
          aria-label="Slide right"
        >
          <i
            className="fa fa-chevron-right"
            style={{ fontSize: '2em', color: '#25c804' }}
          />
        </button>
      </div>
    </div>
  );
};

export default Home;
