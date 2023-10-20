import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import DoctorsList from '../routes/doctors/DoctorsList';

describe('Doctors', () => {
  test('Should render doctors list correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <DoctorsList />
        </BrowserRouter>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
