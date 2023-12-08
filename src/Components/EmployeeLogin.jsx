import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const EmployeeLogin = () => {
    const [values, setValues] = useState({
        Email: '',
        Password: ''
    })
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:4000/employee/employelogin', values)
        .then(result => {
            if(result.data) {
                localStorage.setItem("valid", true)
                localStorage.setItem("empid", result.data.employeeId)
                navigate('/empdash')
            } else {
                setError(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }

    

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-25 border loginForm'>
            <div className='text-warning'>
                {error && error}
            </div>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="Email"><strong>Email:</strong></label>
                    <input type="email" name='Email' autoComplete='off' placeholder='Enter Email'
                     onChange={(e) => setValues({...values, Email : e.target.value})} className='form-control rounded-0'/>
                </div>
                <div className='mb-3'> 
                    <label htmlFor="Password"><strong>Password:</strong></label>
                    <input type="password" name='Password' placeholder='Enter Password'
                     onChange={(e) => setValues({...values, Password : e.target.value})} className='form-control rounded-0'/>
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>
                <div className='mb-1'> 
                   <Link to="/forgot">
                    <label className='text-decoration' htmlFor="password">Forgot password</label>
                    </Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EmployeeLogin