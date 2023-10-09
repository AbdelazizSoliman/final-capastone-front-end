import React from "react";

const LoginPage = () => (
  <div className="container">
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <h3 className="text-center">Login</h3>
          </div>
          <div className="card-body">
            <form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input type="text" className="form-control" id="username" />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input type="password" className="form-control" id="password" />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary">
                  Sign In
                </button>
                <a className="btn btn-link" href="#">
                  Forgot Password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LoginPage;
