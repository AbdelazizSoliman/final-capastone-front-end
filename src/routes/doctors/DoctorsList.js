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
    slider.scrollLeft -= 200; // Adjust the scroll distance as needed
  };

  const slideRight = () => {
    const slider = document.getElementById('slider');
    slider.scrollLeft += 200; // Adjust the scroll distance as needed
  };

  const doctorsArray = useSelector((state) => state.doctors.doctors);

  useEffect(() => {
    if (doctorsArray.length === 0 || doctorsArray.length === undefined) {
      dispatch(fetchDoctors());
    }
  }, [dispatch, doctorsArray]);

  return (
    <div className="d-flex" style={{ width: '100vw' }}>
      <SideNav />
      <div className="d-flex flex-column align-items-center mt-5" style={{ width: '80vw' }}>
        <div className='d-flex flex-column align-items-center'>
          <h1 className='fw-bold'>Doctors list</h1>
          <p className='text-secondary'>Please select a doctor</p>
        </div>
        <div className="slideshow d-flex align-items-center" style={{ width: '100%' }}>
          <button
            type="button"
            className="btn btn-light slide-button m-2"
            onClick={slideLeft}
            aria-label="Slide left"
            style={{ height: '10vh', width: '8%' }}
          >
            <i className="fa fa-chevron-left pl-3" />
          </button>
          <div className="slideshowSlider d-flex gap-2" id="slider" style={{ width: '80%' }}>
            {doctorsArray.map((doctor) => (
              <DoctorItem
                key={doctor.id}
                itemid={doctor.id}
                name={doctor.name}
                timestart={doctor.time_start}
                timeend={doctor.time_end}
              />
            ))}
          </div>
          <button
            type="button"
            className="btn btn-light slide-button m-2"
            onClick={slideRight}
            aria-label="Slide right"
            style={{ height: '10vh', width: '8%' }}
          >
            <i className="fa fa-chevron-right pl-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
