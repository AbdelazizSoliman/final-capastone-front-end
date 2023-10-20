import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addDoctor, fetchSpecializations } from '../../redux/doctors/doctorThunk';
import SideNav from '../../components/home/SideNav';

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

      navigate('/home');
    } catch (err) {
      setError(err.message || 'Error adding doctor. Please try again.');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center bg-light" style={{ minHeight: '100vh' }}>
      <SideNav />
      <div className="d-flex flex-column align-items-center pt-5" style={{ width: '80vw' }}>
        <form className="p-4">
          <h2 className='mb-3'>Create a New Doctor</h2>
          {error && <p className="text-danger">{error}</p>}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="name"
              value={doctorInfo.name}
              onChange={handleChange}
              placeholder='Name'
            />
          </div>
          <div className="mb-3">
            <input
              type="time"
              className="form-control"
              name="time_start"
              value={doctorInfo.time_start}
              onChange={handleChange}
              required
              placeholder='Available from'
            />
          </div>
          <div className="mb-3">
            <input
              type="time"
              className="form-control"
              name="time_end"
              value={doctorInfo.time_end}
              onChange={handleChange}
              required
              placeholder='Available end'
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              name="specialization_id"
              value={doctorInfo.specialization_id}
              onChange={handleChange}
            >
              <option value="">Select Specialization</option>
              {specializations.map((spec) => (
                <option key={spec.id} value={spec.id}>
                  {spec.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="phone_number"
              value={doctorInfo.phone_number}
              onChange={handleChange}
              placeholder='Phone Number'
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              className="form-control"
              name="picture"
              value={doctorInfo.picture}
              onChange={handleChange}
              placeholder='Online url'
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="price"
              value={doctorInfo.price}
              onChange={handleChange}
              placeholder='Price'
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddDoctor}
            style={{width: '100%'}}
          >
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
