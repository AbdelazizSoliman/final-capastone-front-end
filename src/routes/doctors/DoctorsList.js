import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '../../redux/doctors/doctorThunk';
import SideNav from '../../components/home/SideNav';
import DoctorItem from '../../components/home/doctorItem';

const Home = () => {
  const dispatch = useDispatch();

  const doctorsArray = useSelector((state) => state.doctors.doctors);

  useEffect(() => {
    if (doctorsArray.length === 0) {
      dispatch(fetchDoctors());
    }
  }, [dispatch, doctorsArray]);
  return (
    <div className="">
      <SideNav />
      <div className="slideshowSlider">
        {doctorsArray.map((doctor) => (
          <DoctorItem
            key={doctor.id}
            name={doctor.name}
            specialization={doctor.specialization.name}
            timestart={doctor.time_start}
            timeend={doctor.time_end}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
