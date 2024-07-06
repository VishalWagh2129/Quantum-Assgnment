import React from 'react';
import { UserCircleIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { message } from 'antd';
import "./Register.css";

function Register() {
  const [user, setUser] = React.useState({
    name: "",
    dob: "",
    email: "",
    password: ""
  });

  const signup = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/register', user);
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", JSON.stringify(response.data));
        window.location.href = "/login";
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  }
  return (
    <div className="bg-secondary d-flex align-items-center justify-content-center">
      <div className="bg-white w-100 max-w-md p-4 rounded-lg shadow-lg position-relative">
        <div className="bg-white text-dark p-3 rounded-top text-center">
          <h2>Sign Up</h2>
        </div>
        <form className="p-3">
          <div className="form-group position-relative mb-3">
            
            <input
              type="text"
              id="name"
              className="form-control pl-5"
              placeholder="Name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
          <div className="form-group position-relative mb-3">
           
            <input
              type="date"
              id="dob"
              className="form-control pl-5"
              placeholder="Enter Date of Birth"
              value={user.dob}
              onChange={(e) => setUser({ ...user, dob: e.target.value })}
            />
          </div>
          <div className="form-group position-relative mb-3">
         
            <input
              type="text"
              id="email"
              className="form-control pl-5"
              placeholder="Enter Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="form-group position-relative mb-3">
            
            <input
              type="password"
              id="password"
              className="form-control pl-5"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={signup}>
            Sign up
          </button>
        </form>
      </div>
    </div>

  )
}

export default Register;