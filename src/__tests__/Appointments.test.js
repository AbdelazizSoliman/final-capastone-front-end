import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AppointmentsList from '../routes/appointments/AppointmentsList';
import store from '../redux/store';

describe('Appointmetns component', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <AppointmentsList />
        </BrowserRouter>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
