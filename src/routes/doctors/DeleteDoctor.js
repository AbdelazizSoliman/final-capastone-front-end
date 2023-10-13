import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchDoctors, { deleteDoctor } from '../../redux/doctors/doctorThunk';
import SideNav from '../../components/home/SideNav';
import DoctorItem from '../../components/home/doctorItem';

const DeleteDoctor = () => {
  const dispatch = useDispatch();
  const doctorsArray = useSelector((state) => state.doctors.doctors);

  useEffect(() => {
    if (doctorsArray.length === 0) {
      dispatch(fetchDoctors());
    }
  }, [dispatch, doctorsArray]);

  const handleDelete = (doctorId) => {
    dispatch(deleteDoctor(doctorId));
  };

  return (
    <div className="h-screen bg-green">
      <SideNav />
      {doctorsArray.length > 0 ? (
        <ul className="slideshowSlider">
          {doctorsArray.map((doctor) => (
            <li key={doctor.id}>
              <DoctorItem name={doctor.name} />
              <button type="button" onClick={() => handleDelete(doctor.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div>No doctors available</div>
      )}
    </div>
  );
};

export default DeleteDoctor;
