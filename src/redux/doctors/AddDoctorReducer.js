import axios from 'axios';

const CREATE_DOCTOR = 'DOCTOR_APPOINTMENT/CREATE_DOCTOR';

const doctorsState = [];

const createDoctor = (payload) => ({
  type: CREATE_DOCTOR,
  payload,
});

export const addDoctor = (payload) => async (dispatch) => {
  axios
    .post('http://localhost:3000/api/v1/doctors', payload)
    .then((res) => {
      dispatch(createDoctor(res.data));
    })
    .catch((error) => {
      dispatch(createDoctor(error.response.data));
    });
};

const addDoctorReducer = (state = doctorsState, action) => {
  switch (action.type) {
    case CREATE_DOCTOR:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default addDoctorReducer;
