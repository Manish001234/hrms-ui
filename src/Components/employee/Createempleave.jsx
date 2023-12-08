import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Createempleave = () => {
    const [employee, setEmployee] = useState([])
    const [employeedetail, setEmployeedetail] = useState([])
    var Empid = localStorage.getItem("empid");
    const Navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault();
        
        const employeeData = {
            Employee_Id:Empid,
            Name:employeedetail.Employee_Name,
            Email:employeedetail.Email,
          Leave_type: employee.Leave_type,
          From_date: employee.From_date,
          To_date: employee.To_date,
          Reason: employee.Reason,
      
        };
      
        axios.post('http://localhost:4000/leave/create', employeeData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((result) => {
            if (result.data) {
              alert("Sucessfully created");
              Navigate("/empdash/employee_leave")
            } else {
              alert(result.data.Error);
            }
          })
          .catch((err) => console.log(err));
      };

      const FormSubmit = async (e) => {
        e.preventDefault()
       
        fetch("https://formsubmit.co/ajax/manish@mushroomworldbpl.com", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            Message : `${employeedetail.Employee_Name} has applied for leave`,
            fromDate: e?.target[2]?.value,
            toDate: e?.target[3]?.value,
            
          })
        })
          .then(response => response.json())
          .then(data => {
            alert("Contact submitted")
            
            e.target[2].value = ""
            e.target[3].value = ""
        
          })
          .catch(error => console.log(error));
      }

      const handleBothSubmissions = async (e) => {
        await handleSubmit(e);
        await FormSubmit(e);
      };

      useEffect(() => {
        axios.get(`http://localhost:4000/employee/getEmployee/`+Empid)
        .then(result => {
            setEmployeedetail(result.data)
        })
        .catch(err => console.log(err))
    }, [])
  return (
    <div>
      <div className="col p-0 m-0">
  

  <div className="d-flex justify-content-center align-items-center mt-4">
<div className="p-3 rounded w-50 border">
<h3 className="text-center">Create Leave</h3><br />   
<form className="row g-1"  onSubmit={handleBothSubmissions}>
<div className="col-6">
  <label htmlFor="inputName" className="form-label">
    Leave Type
  </label>
  <select
    className="form-select rounded-0"
    id="inputName"
    onChange={(e) =>
      setEmployee({ ...employee, Leave_type: e.target.value })
    }
  >
    <option value="">Select Leave Type</option>
    <option value="Sick Leave">Sick Leave</option>
    <option value="Casual Leave">Casual Leave</option>
  </select>
</div>

  <div className="col-6">
    <label htmlFor="inputSalary" className="form-label">
    Reason
    </label>
    <input
      type="text"
      className="form-control rounded-0"
      id="inputSalary"
      placeholder="Enter Reason"
      autoComplete="off"
      onChange={(e) =>
        setEmployee({ ...employee, Reason: e.target.value })
      }
    />
  </div>

  <div className="col-6">
  <label htmlFor="inputEmail4" className="form-label">
    From Date
  </label>
  <input
    type="date"  // Change the type to "date"
    className="form-control rounded-0"
    name='fromDate'
    id="inputFrom"
    onChange={(e) =>
      setEmployee({ ...employee, From_date: e.target.value })
    }
  />
</div>
<div className="col-6">
  <label htmlFor="inputPassword4" className="form-label">
    To Date
  </label>
  <input
    type="date"  // Change the type to "date"
    name='toDate'
    className="form-control rounded-0"
    id="inputTo"
    onChange={(e) =>
      setEmployee({ ...employee, To_date: e.target.value })
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

  

 

 
</div>
    </div>
  )
}

export default Createempleave
