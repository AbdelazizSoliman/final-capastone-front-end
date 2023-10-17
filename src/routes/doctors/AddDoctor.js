import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addDoctor, fetchSpecializations } from '../../redux/doctors/doctorThunk';
import SideNav from '../../components/home/SideNav';
import './doctor.css';

const AddDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [doctorInfo, setDoctorInfo] = useState({
    name: '',
    specialization_id: '',
    picture: '',
    price: '',
    phone_number: '',
    time_start: '',
    time_end: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(fetchSpecializations());
  }, [dispatch]);

  const specializations = useSelector((state) => state.doctors.specializations);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorInfo({ ...doctorInfo, [name]: value });
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();

    if (
      doctorInfo.name.length === 0
      || doctorInfo.specialization_id.length === 0
      || doctorInfo.picture.length === 0
      || doctorInfo.price.length === 0
      || doctorInfo.phone_number.length === 0
      || doctorInfo.time_start.length === 0
      || doctorInfo.time_end.length === 0
    ) {
      toast.warn('Please fill in all fields');
      return;
    }
    try {
      dispatch(addDoctor(doctorInfo));
      setDoctorInfo({
        name: '',
        specialization_id: '',
        picture: '',
        price: '',
        phone_number: '',
        time_start: '',
        time_end: '',
      });

      toast.success('Doctor added successfully!', {
        position: toast.POSITION.TOP_CENTER,
      });

      navigate('/');
    } catch (err) {
      setError(err.message || 'Error adding doctor. Please try again.');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center bg-green">
      <SideNav />
      <div className="home_component">

        <form>
          <h2>Add Doctor</h2>
          {error && <p>{error}</p>}
          <input placeholder="Name" name="name" value={doctorInfo.name} onChange={handleChange} />
          <div>Start</div>
          <input
            className="form-control"
            placeholder="Available from"
            type="time"
            name="time_start"
            value={doctorInfo.time_start}
            onChange={handleChange}
            required
          />
          <div>End</div>
          <input
            className="form-control"
            placeholder="Available end"
            type="time"
            name="time_end"
            value={doctorInfo.time_end}
            onChange={handleChange}
            required
          />
          <div>Select Specialization</div>
          <select name="specialization_id" value={doctorInfo.specialization_id} onChange={handleChange}>
            <option value="">Select Specialization</option>
            {specializations.map((spec) => (
              <option key={spec.id} value={spec.id}>
                {spec.name}
              </option>
            ))}
          </select>
          <input placeholder="Phone Number" name="phone_number" value={doctorInfo.phone_number} onChange={handleChange} />
          <input placeholder="Image URL" type="file" accept="image/*" name="picture" onChange={handleChange} />
          <input placeholder="Price" name="price" value={doctorInfo.price} onChange={handleChange} />
          <button type="button" onClick={handleAddDoctor}>
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
