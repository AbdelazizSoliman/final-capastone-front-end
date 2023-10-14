// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { addAppointment } from '../../redux/appointments/appointmentThunk';
// import { fetchDoctors } from '../../redux/doctors/doctorThunk';
// import SideNav from '../../components/home/SideNav';

// function NewAppointment() {
//   const dispatch = useDispatch();
//   const [appointmentData, setAppointmentData] = useState({
//     doctorId: '',
//     date: '',
//     time: '',
//     city: '',
//   });
//   const { doctors } = useSelector((store) => store.doctors);
//   const { addSuccess } = useSelector((store) => store.appointments);
//   const { id } = useParams();

//   useEffect(() => {
//     if (!doctors.length) dispatch(fetchDoctors());
//   }, [dispatch, doctors.length]);

//   useEffect(() => {
//     if (addSuccess && appointmentData.date.length) {
//       setAppointmentData({
//         doctorId: '',
//         date: '',
//         time: '',
//         city: '',
//       });
//     }
//   }, [addSuccess]);

//   const handleCreateNewAppointment = async (e) => {
//     e.preventDefault();

//     const doctorId = e.target.children[0].children[0].value;

//     setAppointmentData({
//       ...appointmentData,
//       doctorId,
//     });
//     dispatch(addAppointment({ ...appointmentData, doctorId }));
//   };

//   const handleInputChange = (e) => {
//     setAppointmentData({
//       ...appointmentData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div className="container">
//       <SideNav />
//       <div className="my-4">
//         <h1 className="text-center mb-4 font-weight-bold display-4 bg-success p-3">
//           RESERVE A DOCTOR
//         </h1>
//         <form
//           className="w-75 mx-auto p-4"
//           onSubmit={handleCreateNewAppointment}
//         >
//           <div className="mb-3">
//             <label className="form-label" htmlFor="doctorId">
//               Select a Doctor:
//               <select
//                 className="form-select"
//                 name="doctorId"
//                 value={id}
//                 required
//               >
//                 <option value={null}></option>
//                 {doctors.map((doctor) => (
//                   <option key={doctor.id} value={doctor.id}>
//                     {doctor.name}
//                   </option>
//                 ))}
//               </select>
//             </label>
//           </div>

//           <div className="mb-3">
//             <label className="form-label" htmlFor="city">
//               Select your city:
//               <select
//                 className="form-select"
//                 name="city"
//                 value={appointmentData.city}
//                 onChange={handleInputChange}
//                 required
//               >
//                 <option value="">Select a city</option>
//                 <option value="City1">Cairo</option>
//                 <option value="City2">Marrakech</option>
//               </select>
//             </label>
//           </div>

//           <div className="mb-3">
//             <label className="form-label" htmlFor="date">
//               Select a date:
//               <input
//                 className="form-control"
//                 type="date"
//                 name="date"
//                 value={appointmentData.date}
//                 onChange={handleInputChange}
//                 required
//               />
//             </label>
//           </div>

//           <div className="mb-3">
//             <label className="form-label" htmlFor="time">
//               Select a time:
//               <input
//                 className="form-control"
//                 type="time"
//                 name="time"
//                 value={appointmentData.time}
//                 onChange={handleInputChange}
//                 required
//               />
//             </label>
//           </div>

//           <div className="d-flex justify-content-center">
//             <button type="submit" className="btn btn-primary">
//               Reserve Doctor
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default NewAppointment;
