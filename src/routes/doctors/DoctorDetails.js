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
    <div className="d-flex align-items-center justify-content-center bg-green">
      <SideNav />
      <div className="home_component">
        <div>
          <img height="150px" width="150px" src={doctor.picture} alt="" />
          <h2>{doctor.name}</h2>
          <p>{doctor.price}</p>
          <p>{doctor.specialization_name}</p>
          <p>{doctor.phone_number}</p>
          <Link
            to={`/doctors/details/${id}/appointments/new?doctorName=${doctor.name}`}
            className="btn btn-primary"
          >
            Reserve
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
