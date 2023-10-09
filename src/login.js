import React from 'react';

const LoginPage = () => {
  const handleForgotPassword = () => {
    // Add your desired code here for handling the "Forgot Password?" action
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Login</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3 text-center">
                  <label htmlFor="username" className="form-label">
                    Username
                    <input type="text" className="form-control" id="username" />
                  </label>
                </div>
                <div className="mb-3 text-center">
                  <button type="submit" className="btn btn-primary">
                    Sign In
                  </button>
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={handleForgotPassword}
                  >
                    Forgot Password?
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
