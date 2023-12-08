import React, { useState, useEffect } from "react";
import axios from "axios";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Empattendance = () => {
  const [empId, setEmpId] = useState(localStorage.getItem("empid"));
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday (0) or Saturday (6)
  };

  const tileContent = ({ date }) => {
    const today = new Date();

    if (date > today) {
      // Future dates, no attendance information yet
      return null;
    }

    const attendanceEntry = attendanceRecords.find(
      (entry) =>
        entry.Punch_In &&
        new Date(entry.Punch_In).toDateString() === date.toDateString()
    );

    if (isWeekend(date)) {
      // Weekend, display as holiday
      return (
        <div
          style={{
            backgroundColor: "blue",
            color: "white",
            textAlign: "center",
            borderRadius: "10%",
            padding: "2px",
          }}
        >
          Holiday
        </div>
      );
    } else if (attendanceEntry) {
      // Present or Absent based on Punch_Out
      const isPresent = attendanceEntry.Punch_Out !== undefined;
      const backgroundColor = isPresent ? "green" : "red";
      return (
        <div
          style={{
            backgroundColor,
            color: "white",
            textAlign: "center",
            borderRadius: "10%",
            padding: "2px",
          }}
        >
          {isPresent ? "Present" : "Absent"}
        </div>
      );
    } else {
      // No attendance entry, display as Absent
      return (
        <div
          style={{
            backgroundColor: "red",
            color: "white",
            textAlign: "center",
            borderRadius: "10%",
            padding: "2px",
          }}
        >
          Absent
        </div>
      );
    }
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("overlay")) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    // Fetch attendance records for the employee
    axios
      .get(`http://localhost:4000/attendence/employee/${empId}`)
      .then((response) => {
        setAttendanceRecords(response.data);
      })
      .catch((error) => {
        console.error("Error fetching attendance records:", error);
      });
  }, [empId]);

  const handlePunchIn = () => {
    // Make API call to punch in
    axios
      .post("http://localhost:4000/attendence/create", {
        Employee_Id: empId,
      })
      .then((response) => {
        console.log("Punch in response:", response.data);
        // Check if the response data contains expected fields
        if (
          response.data &&
          response.data.attendanceRecord &&
          response.data.attendanceRecord.Employee_Id &&
          response.data.attendanceRecord.Punch_In
        ) {
          // Update the state with the new attendance record
          setAttendanceRecords([
            ...attendanceRecords,
            response.data.attendanceRecord,
          ]);
          // Persist the updated records to local storage
          localStorage.setItem(
            "attendanceRecords",
            JSON.stringify([
              ...attendanceRecords,
              response.data.attendanceRecord,
            ])
          );
          window.location.reload();
        } else {
          console.error("Invalid punch in response:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error punching in:", error);
      });
  };

  const handlePunchOut = (attendanceRecordId) => {
    // Make API call to punch out
    axios
      .put(`http://localhost:4000/attendence/${attendanceRecordId}`)
      .then(() => {
        // Update the state by filtering out the punched out record
        const updatedRecords = attendanceRecords.filter(
          (record) => record._id !== attendanceRecordId
        );
        setAttendanceRecords(updatedRecords);
        // Persist the updated records to local storage
        localStorage.setItem(
          "attendanceRecords",
          JSON.stringify(updatedRecords)
        );
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error punching out:", error);
      });
  };

  return (
    <div onClick={handleOverlayClick}>
      <div className="px-5 mt-3">
        <div className="d-flex justify-content-center">
          <h3>Attendance</h3>
          <br />
        </div>
        <br />
        <div className="d-flex justify-content-center gap-5">
          <button onClick={handlePunchIn} className="btn btn-success">
            Punch In
          </button>
          <span
            className="cursor-pointer"
            onClick={toggleCalendar}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            📅 Show Calendar
          </span>
        </div>
        <div className="mt-3">
          <br />
          {showCalendar && (
            <div
              className="overlay"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "8px",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Calendar
                  tileContent={tileContent}
                  value={selectedDate}
                  onClickDay={handleDateChange}
                />
              </div>
            </div>
          )}
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record) => (
                <tr key={record._id}>
                  <td>{record.employeeDetails?.Employee_Name}</td>
                  <td>{record.Punch_In || "Not available"}</td>
                  <td>{record.Punch_Out || "Not available"}</td>
                  <td>{record.Attendance_Type}</td>
                  <td>{record.Employee_Id}</td>
                  <td>
                    {record.Punch_Out ? (
                      "Punch Out Recorded"
                    ) : (
                      <button
                        onClick={() => handlePunchOut(record._id)}
                        className="btn btn-danger"
                      >
                        Punch Out
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Empattendance;
