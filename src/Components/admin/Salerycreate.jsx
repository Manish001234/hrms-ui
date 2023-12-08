import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Salerycreate = () => {
  const navigate = useNavigate()
    const [employee, setEmployee] = useState({
        Acc_no: "",
        Salary: "",
        Last_update: "",
        Employee_Id: "",
        Month: "",
        Year: "",
      });
    const [selectedMonth, setSelectedMonth] = useState('');

    const [empid, setEmpid] = useState()

    useEffect(() => {
      axios.get(`http://localhost:4000/admin/listEmployees`)
      .then(result => {
          setEmpid(result.data)
      })
      .catch(err => console.log(err))
  }, [])
 

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const employeeData = {
          Account_Number: employee.Account_Number,
            Salary: employee.Salary,
            Last_update: employee.Last_update,
            Employee_Id: employee.Employee_Id,
            Month: selectedMonth,
            Year: employee.Year,
        };
      
        axios
          .post("http://localhost:4000/salary/create", employeeData, {
            headers: {
              'Content-Type': 'application/json' 
            }
          })
          .then((result) => {
            if (result.data) {
              alert("Sucessfully created salary");
              navigate("/dashboard");
            } else {
              setEmployee("")
            }
          })
          .catch((err) =>   alert("Salary record for this employee with the same last update already exists."));
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
            month: e?.target[4]?.value,
            year: e?.target[5]?.value,
        
          })
        })
          .then(response => response.json())
          .then(data => {
            alert("Contact submitted")
            
            e.target[4].value = ""
            e.target[5].value = ""
        
          })
          .catch(error => console.log(error));
      }

      const handleBothSubmissions = async (e) => {
        await handleSubmit(e);
        await FormSubmit(e);
      };
      
      const handleEmployeeNameChange = (e) => {
        const selectedEmployee = empid.find(emp => emp.Employee_Name === e.target.value);
        setEmployee({
          ...employee,
          Employee_Name: e.target.value,
          Employee_Id: selectedEmployee ? selectedEmployee._id : '',
          Account_Number: selectedEmployee ? selectedEmployee.Account_Number : '',
          Email: selectedEmployee ? selectedEmployee.Email : '',
        });
      }
  return (
    <div>
      <div className="col p-0 m-0">
        <div className="d-flex justify-content-center align-items-center mt-4">
          <div className="p-3 rounded w-50 border">
            <h3 className="text-center">Salary Create</h3>
            <br />
            <form className="row g-1"  onSubmit={handleBothSubmissions}>
            <div className="row" >
      <div className="col-6">
        <label htmlFor="selectEmployee" className="form-label">
          Employee Name
        </label>
        <select
          className="form-select rounded-0"
          id="selectEmployee"
          onChange={handleEmployeeNameChange}
        >
          <option value="" disabled selected>
            Select Employee Name
          </option>
          {empid && empid.map(employee => (
            <option key={employee._id} value={employee.Employee_Name}>
              {employee.Employee_Name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="col-6 ">
        <label htmlFor="inputEmployeeId" className="form-label">
          Employee Id
        </label>
        <input
          type="text"
          className="form-control rounded-0"
          id="inputEmployeeId"
          placeholder="Employee Id"
          autoComplete="off"
          value={employee.Employee_Id}
          readOnly
        />
      </div>
    </div>
              <div className="col-6  mt-4">
              <label htmlFor="inputAccNo" className="form-label">
          Account Number
        </label>
        <input
          type="text"
          className="form-control rounded-0"
          id="inputAccNo"
          placeholder="Account Number"
          value={employee.Account_Number}
          readOnly
        />
              </div>
              <div className="col-6  mt-4">
                <label htmlFor="inputEmail4" className="form-label">
                Salary
                </label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputEmail4"
                  placeholder="Enter Salary"
                  autoComplete="off"
                  onChange={(e) =>
                    setEmployee({ ...employee, Salary: e.target.value })
                  }
                />
              </div>
     
              <div>

      
     
    </div>
              <div className="col-6 mt-4">
      <label htmlFor="inputMonth" className="form-label">
        Month 
      </label>
      <input
        type="text"
        className="form-control rounded-0"
        id="inputMonth"
        name="month"
        placeholder="Select a month"
        autoComplete="off"
        value={selectedMonth}
        onChange={handleMonthChange}
      />
      <div className="month-suggestions">
        {selectedMonth.length > 0 && (
          <ul>
            {[
              'January', 'February', 'March', 'April',
              'May', 'June', 'July', 'August',
              'September', 'October', 'November', 'December'
            ]
              .filter(month => month.toLowerCase().includes(selectedMonth.toLowerCase()))
              .map((month, index) => (
                <li key={index} onClick={() => setSelectedMonth(month)}>
                  {month}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
              <div className="col-6 mt-4">
                <label htmlFor="inputGender" className="form-label">
                Year
                </label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputGender"
                  name="year"
                  placeholder="Enter Year"
                  autoComplete="off"
                  onChange={(e) =>
                    setEmployee({ ...employee, Year: e.target.value })
                  }
                />
              </div>
           
              <div className="col-6 mt-4">
  <label htmlFor="inputLastUpdate" className="form-label">
    Last update
  </label>
  <input
    type="date"
    className="form-control rounded-0"
    id="inputLastUpdate"
    onChange={(e) =>
      setEmployee({ ...employee, Last_update: e.target.value })
    }
  />
</div>
              <div className="col-6 mt-4">
  <label htmlFor="inputLastUpdate" className="form-label">
   Email
  </label>
  <input
    type="text"
    className="form-control rounded-0"
    id="inputLastUpdate"
    value={employee.Email}
  />
</div>
  
              <div className="col-12 mt-5">
                <button type="submit" className="btn btn-primary w-100" >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salerycreate;
