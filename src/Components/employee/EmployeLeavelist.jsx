import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { Link, Navigate, Outlet, useNavigate, useParams } from 'react-router-dom'

const EmployeLeavelist = () => {
    const {id} = useParams()
    const [employee, setEmployee] = useState([])
    const [employeedetail, setEmployeedetail] = useState([])
    var Empid = localStorage.getItem("empid");
    const Navigate = useNavigate()
   


    

      useEffect(() => {
        axios.get(`http://localhost:4000/employee/leaves?Employee_Id=${Empid}`)
        .then(result => {
            // console.log(result.data.firstName)
            setEmployee(result.data)
        })
        .catch(err => console.log(err))
    }, [])
  return (

    <>
      <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Leave List</h3>
      </div>
      <Link to="/empdash/createempleave" className="btn btn-success">
        Create leave
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              {/* <th>Image</th> */}
              <th>Email</th>
              <th>Leave Type</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e) => (
              <tr>
                <td>{e.Name}</td>
                {/* <td>
                  <img
                    src={`http://localhost:3000/Images/` + e.image}
                    className="employee_image"
                  />
                </td> */}
                <td>{e.Email}</td>
                <td>{e.Leave_type}</td>
                <td>{e.From_date}</td>
                <td>{e.To_date}</td>
                <td>{e.Reason}</td>
                <td>{e.Status}</td>
          
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>



      </>
  )
}

export default EmployeLeavelist
