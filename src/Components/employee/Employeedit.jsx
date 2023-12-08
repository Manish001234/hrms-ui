
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link,Outlet, useNavigate, useParams } from 'react-router-dom'
const Employeedit = () => {
  var id = localStorage.getItem("empid");
    // const {id} = useParams()
    const navigate = useNavigate()
    const [employee, setEmployee] = useState({
        Employee_Name: "",
        Email: "",
        // Password: "",
        Dob: "",
        Contact_no: "",
        Gender: "",
        Address: "",
        Department: "",
        Job_Title: "",
        Skills: "",
        Education: "",
      });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const employeeData = {
          Employee_Name: employee.Employee_Name,
          Email: employee.Email,
          // Password: employee.Password,
          Dob: employee.Dob,
          Contact_no: employee.Contact_no,
          Gender: employee.Gender,
          Address: employee.Address, 
          Department: employee.Department,
          Job_Title: employee.Job_Title,
          Skills: employee.Skills,
          Education: employee.Education
        };
      
        axios.put('http://localhost:4000/employee/updateEmployee/'+id, employeeData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((result) => {
            if (result.data) {
              alert("Sucessfully updated details");
              navigate(`/empdash/employee_detail`);
            } else {
              alert(result.data.Error);
            }
          })
          .catch((err) => console.log(err));
      };

      useEffect(() => {
        axios.get('http://localhost:4000/employee/getEmployee/'+id)
        .then(result => {
            // console.log(result.data.firstName)
            setEmployee(result.data)
        })
        .catch(err => console.log(err))
    }, [])
  return (
    <div className="col p-0 m-0">
  


    <div className="d-flex justify-content-center align-items-center mt-4">
<div className="p-3 rounded w-50 border">
  <h3 className="text-center">Edit Employee fg</h3>
  <form className="row g-1" onSubmit={handleSubmit}>
    <div className="col-6">
      <label htmlFor="inputName" className="form-label">
        Name
      </label>
      <input
        type="text"
        className="form-control rounded-0"
        id="inputName"
        placeholder="Enter Name"
        onChange={(e) =>
          setEmployee({ ...employee, Employee_Name: e.target.value })
        }
      />
    </div>
    <div className="col-6">
      <label htmlFor="inputEmail4" className="form-label">
        Email
      </label>
      <input
        type="text"
        className="form-control rounded-0"
        id="inputEmail4"
        placeholder="Enter Email"
        autoComplete="off"
        onChange={(e) =>
          setEmployee({ ...employee, Email: e.target.value })
        }
      />
    </div>
    {/* <div className="col-6">
      <label htmlFor="inputPassword4" className="form-label">
        Password
      </label>
      <input
        type="password"
        className="form-control rounded-0"
        id="inputPassword4"
        placeholder="Enter Password"
        onChange={(e) =>
          setEmployee({ ...employee, Password: e.target.value })
        }
      />
    </div> */}
    <div className="col-6">
      <label htmlFor="inputSalary" className="form-label">
        Contact Number
      </label>
      <input
        type="text"
        className="form-control rounded-0"
        id="inputSalary"
        placeholder="Enter Contact Number"
        autoComplete="off"
        onChange={(e) =>
          setEmployee({ ...employee, Contact_no: e.target.value })
        }
      />
    </div>
    <div className="col-6">
      <label htmlFor="inputDob" className="form-label">
        Dob
      </label>
      <input
        type="text"
        className="form-control rounded-0"
        id="inputDob"
        placeholder="Enter Dob"
        autoComplete="off"
        onChange={(e) =>
          setEmployee({ ...employee, Dob: e.target.value })
        }
      />
    </div>
    <div className="col-6">
      <label htmlFor="inputGender" className="form-label">
        Gender
      </label>
      <input
        type="text"
        className="form-control rounded-0"
        id="inputGender"
        placeholder="Enter Gender"
        autoComplete="off"
        onChange={(e) =>
          setEmployee({ ...employee, Gender: e.target.value })
        }
      />
    </div>
    <div className="col-6">
      <label htmlFor="inputDepartment" className="form-label">
        Department
      </label>
      <input
        type="text"
        className="form-control rounded-0"
        id="inputDepartment"
        placeholder="Enter Department"
        autoComplete="off"
        onChange={(e) =>
          setEmployee({ ...employee, Department: e.target.value })
        }
      />
    </div>
    <div className="col-6">
      <label htmlFor="inputAddress" className="form-label">
        Address
      </label>
      <input
        type="text"
        className="form-control rounded-0"
        id="inputAddress"
        placeholder="Enter Address"
        autoComplete="off"
        onChange={(e) =>
          setEmployee({ ...employee, Address: e.target.value })
        }
      />
    </div>
    <div className="col-6">
      <label htmlFor="inputSkills" className="form-label">
        Skills
      </label>
      <input
        type="text"
        className="form-control rounded-0"
        id="inputSkills"
        placeholder="Enter Skills"
        autoComplete="off"
        onChange={(e) =>
          setEmployee({ ...employee, Skills: e.target.value })
        }
      />
    </div>
    <div className="col-6">
      <label htmlFor="inputJobTitle" className="form-label">
        Job Title
      </label>
      <input
        type="text"
        className="form-control rounded-0"
        id="inputJobTitle"
        placeholder="Enter Job Title"
        autoComplete="off"
        onChange={(e) =>
          setEmployee({ ...employee, Job_Title: e.target.value })
        }
      />
    </div>
    <div className="col-6">
      <label htmlFor="inputEducation" className="form-label">
        Education
      </label>
      <input
        type="text"
        className="form-control rounded-0"
        id="inputEducation"
        placeholder="Enter Education"
        autoComplete="off"
        onChange={(e) =>
          setEmployee({ ...employee, Education: e.target.value })
        }
      />
    </div>
    <div className="col-12 mt-5">
      <button type="submit" className="btn btn-primary w-100">
        Submit
      </button>
    </div>
  </form>
</div>
</div>
  
  
   

    <Outlet />
</div>
  )
}

export default Employeedit
