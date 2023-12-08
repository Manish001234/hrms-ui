
import axios from 'axios'
import React, { useEffect, useState } from 'react'
const Emphome = () => {
    const [adminTotal, setAdminTotal] = useState(0)
    const [employeeTotal, setemployeeTotal] = useState(0)
    const [salaryTotal, setSalaryTotal] = useState(0)
    const [admins, setAdmins] = useState([])
  
    useEffect(() => {
      
      employeeCount();
  
    
    }, [])
  
  
    const employeeCount = () => {
      axios.get('http://localhost:4000/admin/listEmployees')
      .then(result => {
        if(result.data) {
          setemployeeTotal(result.data.length)
        }
      })
    }
 
  return (
    <div>
        <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        {/* <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div> */}
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>lorem</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Lorem</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>${salaryTotal}</h5>
          </div>
        </div>
      </div>
      {/* <div className='mt-4 px-5 pt-3'>
        <h3>List </h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              admins.map(a => (
                <tr>
                  <td>{a.email}</td>
                  <td>
                  <button
                    className="btn btn-info btn-sm me-2">
                    Edit
                  </button>
                  <button
                    className="btn btn-warning btn-sm" >
                    Delete
                  </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div> */}
    </div>
    </div>
  )
}

export default Emphome
