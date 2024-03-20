import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Attendence = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedName, setSelectedName] = useState('');

  useEffect(() => {
  
    axios.get("http://localhost:4000/attendence/all")
      .then(response => {
        setAttendanceRecords(response.data);
      })
      .catch(error => {
        console.error('Error fetching attendance records:', error);
      });
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
  };
  const filteredAttendanceRecords = attendanceRecords.filter(record => {
    const dateCondition = selectedDate ? record.Punch_In.includes(selectedDate) : true;
    const nameCondition = selectedName ? record.employeeDetails.Employee_Name.includes(selectedName) : true;

    return dateCondition && nameCondition;
  });

  return (
    <div>
      <div className="px-5 mt-3">
        <div className="d-flex justify-content-center">
          <h3>Attendance</h3>
          <br />
        </div>
        <br />
        <div className="d-flex justify-content-center gap-5">
          <input
            type="date"
            className="form-control rounded-0 w-25"
            onChange={handleDateChange}
          />
          <input
            type="text"
            className="form-control rounded-0 w-25"
            placeholder="Employee Name"
            onChange={handleNameChange}
          />
        </div>

        <div className="mt-3">
          <table className="table">
            <thead>
              <tr>
              <th>Employee Name</th>
                <th>Punch In</th>
                <th>Punch Out</th>
                <th>Attendance Type</th>
                <th>Employee Id</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendanceRecords.map(record => (
                <tr key={record._id}>
                  <td>{record.employeeDetails.Employee_Name}</td>
                  <td>{record.Punch_In || 'Not available'}</td>
                  <td>{record.Punch_Out || 'Not available'}</td>
                  <td>{record.Attendance_Type}</td>
                  <td>{record.Employee_Id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Attendence;
