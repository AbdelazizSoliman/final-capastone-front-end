import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SideNav from '../../components/home/SideNav';
import { fetchDoctorDetails } from '../../redux/doctors/doctorThunk';

const DoctorDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchDoctorDetails(id));
  }, [dispatch, id]);

  const doctor = useSelector((state) => state.doctors.doctors);

  return (
    <div className="d-flex align-items-center justify-content-center bg-green" style={{height: '100vh'}}>
      <SideNav />
      <div className="row p-4" style={{width: '80vw', height: '100%'}}>
        <div className="col" style={{height: '100%'}}>
          <img width="100%" height="100%" src={doctor.picture} alt="" className='rounded' />
        </div>
        <div className="col px-5 d-flex flex-column gap-3">
          <h2>{doctor.name}</h2>
          <p className='btn btn-light d-flex justify-content-between px-3'><span>Specialization</span> <span>{doctor.specialization_name}</span></p>
          <p className='d-flex justify-content-between px-3'><span>Phone number</span><span>{doctor.phone_number}</span></p>
          <p className='btn btn-light d-flex justify-content-between px-3'><span>Price</span><span>{doctor.price}</span></p>
          <p className='d-flex justify-content-between px-3'><span>Available from</span><span>{doctor.time_start}</span></p>
          <p className='d-flex justify-content-between px-3'><span>Available until</span><span>{doctor.time_end}</span></p>
          <Link
            to={`/doctors/details/${id}/appointments/new?doctorName=${doctor.name}`}
            className="btn btn-primary rounded-pill d-flex align-items-center justify-content-center text-lg fw-bold"
            style={{width: '50%', height: '4rem'}}
          >
            Reserve
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
