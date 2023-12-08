import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'



const EmployeeDetail = () => {
    const [employee, setEmployee] = useState([])
    const {id} = useParams()
    var Empid = localStorage.getItem("empid");
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:4000/employee/getEmployee/'+Empid)
        .then(result => {
            // console.log(result.data.firstName)
            setEmployee(result.data)
        })
        .catch(err => console.log(err))
    }, [])

  return (
    <div className="col p-0 m-0">

    <div className="card" style={{ width: "26%" , margin:'auto' , marginTop:"5%"}}>
{/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
{/* <div className="card-body">
<h5 className="card-title">Card title</h5>
<p className="card-text">
Some quick example text to build on the card title and make up the bulk of
the card's content.
</p>
</div> */}
<ul className="list-group list-group-flush text-center">
<li className="list-group-item">Name : {employee.Employee_Name}</li>
<li className="list-group-item">Email : {employee.Email}</li>
<li className="list-group-item">Date of birth : {employee.Dob}</li>
<li className="list-group-item">Contact number : {employee.Contact_no}</li>
<li className="list-group-item">Gender : {employee.Gender}</li>
<li className="list-group-item">Address : {employee.Address}</li>
<li className="list-group-item">Department : {employee.Department}</li>
<li className="list-group-item">Job Title : {employee.Job_Title}</li>
<li className="list-group-item">Skills : {employee.Skills}</li>
<li className="list-group-item">Education : {employee.Education}</li>


</ul>
<div className="card-body m-auto">
<div className='d-flex gap-5'>
<Link
to={`/empdash/employee_edit`}   
            >
             <button className='btn btn-primary  '>Edit Details</button>
         
            </Link>
<Link
to={`/empdash/changepassword`}   
            >
            <button className='btn btn-primary  '>Reset password</button>
         
            </Link>
         
      
       </div>
</div>
</div>


       {/* <img src={`http://localhost:3000/Images/`+employee.image} className='emp_det_image'/> */}
  
   

    <Outlet />
</div>
    
  )
}

export default EmployeeDetail