import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchOneDoctor, setCurrentDoctorDispatcher } from '../../redux/bookDoctor/doctorThunks';
import classes from './Detail.module.css';

function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { doctor } = useSelector((state) => state.bookDoctorReducer);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchOneDoctor(id));
  }, [dispatch]);

  const handleClick = async () => {
    await dispatch(setCurrentDoctorDispatcher(doctor.id));
    navigate('/book_appointment');
  };

  return (
    <section className={classes.doctor}>
      <div className={classes.detail}>
        <div className={classes.photo}>
          <img alt="doctor" src={doctor.image_url} />
        </div>
        <div className={classes.info}>
          <h2 className={classes.name}>{doctor.name}</h2>
          <div className={classes.description}>{doctor.description}</div>
          <div className={`${classes.item} ${classes.neutral}`}>
            <div>City</div>
            <div className={classes.city}>{doctor.city}</div>
          </div>
          <div className={`${classes.item}`}>
            <div>Specialization</div>
            <div className={classes.specialization}>{doctor.specialization}</div>
          </div>
          <div className={`${classes.item} ${classes.neutral}`}>
            <div>Cost per day</div>
            <div className={classes.cost_per_day}>
              $
              {doctor.cost_per_day}
            </div>
          </div>
          <div className={classes.reserve}>
            <button type="button" className={classes.btn} onClick={() => handleClick()}>
              <i className="fa-solid fa-gear" />
              Reserve
              <i className="fa-regular fa-circle-right" />
            </button>
          </div>
        </div>
      </div>
      <div className={classes.back}>
        <Link to="/">
          <button type="button" className={classes.btn1}>
            <i className="fa-solid fa-caret-left" />
          </button>
        </Link>
      </div>

      <div />
    </section>
  );
}

export default Details;
