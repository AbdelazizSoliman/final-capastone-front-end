import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '../../redux/doctors/doctorThunk';
import SideNav from '../../components/home/SideNav';
import DoctorItem from '../../components/home/doctorItem';
import './slides.css';

const Home = () => {
  const dispatch = useDispatch();

  const doctorsArray = useSelector((state) => state.doctors.doctors);

  useEffect(() => {
    if (doctorsArray.length === 0) {
      dispatch(fetchDoctors());
    }
  }, [dispatch, doctorsArray]);
  return (
    <div className="h-screen bg-green">
      <SideNav />
      <div className="home_component" id="slider">
        <div className="flex"><i className="fa fa-chevron-left" style={{ fontSize: '2em', color: '#25c804' }} /></div>
        <div className="slideshowSlider">
          {doctorsArray.map((doctor) => (
            <DoctorItem
              key={doctor.id}
              name={doctor.name}
            />
          ))}
        </div>
        <div className="flex"><i className="fa fa-chevron-right" style={{ fontSize: '2em', color: '#25c804' }} /></div>
      </div>
    </div>
  );
};

export default Home;
