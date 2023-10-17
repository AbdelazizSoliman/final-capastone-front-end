import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors, deleteDoctor } from '../../redux/doctors/doctorThunk';
import SideNav from '../../components/home/SideNav';
import ItemToDelete from '../../components/home/ItemToDelete';

const DeleteDoctor = () => {
  const dispatch = useDispatch();
  const doctorsArray = useSelector((state) => state.doctors.doctors);

  useEffect(() => {
    if (doctorsArray.length === 0) {
      dispatch(fetchDoctors());
    }
  }, [dispatch, doctorsArray]);

  const handleDelete = (doctorId) => {
    dispatch(fetchDoctors());
    dispatch(deleteDoctor(doctorId));
    dispatch(fetchDoctors());
  };

  return (
    <div className="h-100 bg-green d-flex">
      <SideNav />

      <div className="p-5" style={{ width: '80%', height: '100vh', overflowX: 'scroll' }}>
        {doctorsArray.length > 0 ? (
          <ul className="list-group grid gap-3">
            {doctorsArray.map((doctor) => (
              <li key={doctor.id} className="list-group-item d-flex justify-content-between align-items-center delete-item">
                <ItemToDelete name={doctor.name} />
                <button type="button" className="btn btn-danger" onClick={() => handleDelete(doctor.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="alert alert-warning">No doctors available</div>
        )}
      </div>
    </div>
  );
};

export default DeleteDoctor;
