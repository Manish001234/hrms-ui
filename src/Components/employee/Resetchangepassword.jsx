import axios from 'axios';
import React, { Children, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Resetchangepassword = () => {
    const [password, setPassword] = useState("");
    const { token } = useParams();
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const employeeData = {
          token: token,
          newPassword:password,
 
        };
      
        axios.post('http://localhost:4000/employee/reset-password/confirm', employeeData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((result) => {
            if (result.data) {
              alert("Sucessfully Password Changed ");
              navigate(`/empdash`);
            } else {
              alert(result.data.Error);
            }
          })
          .catch((err) => console.log(err));
      };
  return (
    <div>
          <>
      <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
        <div className="p-3 rounded w-25 border loginForm">
          <h2 className="text-center">update Password</h2>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="Password">
                <strong>Password:</strong>
              </label>
              <input
                type="password"
                name="Password"
                autoComplete="off"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control rounded-0"
              />
            </div>
            <br />
            <button className="btn btn-success w-100 rounded-0 mb-2">
              {" "}
              Send Reset link
            </button>
            <div className="mb-1"></div>
          </form>
        </div>
      </div>
    </>
    </div>
  )
}

export default Resetchangepassword
