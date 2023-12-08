import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Paswordchange = () => {
    var id = localStorage.getItem("empid");
    // const {id} = useParams()
    const navigate = useNavigate()
    const [employee, setEmployee] = useState({
      
        Password: "",

      });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const employeeData = {
      
          Password: employee.Password,
 
        };
      
        axios.put('http://localhost:4000/employee/updateEmployee/'+id, employeeData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((result) => {
            if (result.data) {
              alert("Sucessfully Changed Password");
              navigate(`/empdash`);
            } else {
              alert(result.data.Error);
            }
          })
          .catch((err) => console.log(err));
      };
  return (
    <div>
          <div className="col p-0 m-0">
  


  <div className="d-flex justify-content-center align-items-center mt-4">
<div className="p-3 rounded w-50 border">
<h3 className="text-center">Change Password</h3>
<br /><br />
<form className="row g-1" onSubmit={handleSubmit}>

 
  <div className="col-6">
    <label htmlFor="inputPassword4" className="form-label">
     New Password
    </label>
    <input
      type="password"
      className="form-control rounded-0"
      id="inputPassword4"
      placeholder="Enter New Password"
      onChange={(e) =>
        setEmployee({ ...employee, Password: e.target.value })
      }
    />
  </div>

  
  <div className="col-6">
    <label htmlFor="inputEmail4" className="form-label">
   Confirm  Password
    </label>
    <input
      type="text"
      className="form-control rounded-0"
      id="inputEmail4"
      placeholder="Enter Confirm Password"
      autoComplete="off"
    //   onChange={(e) =>
    //     setEmployee({ ...employee, Email: e.target.value })
    //   }
    />
  </div>
<br />
  <div className="col-12 mt-5">
    <button type="submit" className="btn btn-primary w-100">
      Submit
    </button>
  </div>
</form>
</div>
</div>
</div>
    </div>
  )
}

export default Paswordchange
