import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLeaveContext } from "./LeaveContext";

const Leavelist = () => {
  const { leave, setLeave, actionPerformed, setActionPerformed } =
    useLeaveContext();

  useEffect(() => {
    axios
      .get("http://localhost:4000/leave/all")
      .then((result) => {
        if (result.data) {
          const leaveData = result.data.map((leaveItem) => ({
            ...leaveItem,
            processed: false,
          }));
          setLeave(leaveData);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAccept = async (e) => {
    const leaveId = e.Leave_id;

    if (e.Status === "Accepted" || e.Status === "Rejected") {
      return;
    }

    const postData = {
      leaveId: leaveId,
      Status: "Accepted",
    };

    try {
      const result = await axios.post(
        "http://localhost:4000/admin/leave/accept",
        postData
      );

      if (result.data) {
        // Send email after accepting
        await sendEmail(leaveId, "Accepted");

        setLeave((prevLeave) =>
          prevLeave.map((leaveItem) =>
            leaveItem.Leave_id === leaveId
              ? { ...leaveItem, Status: "Accepted" }
              : leaveItem
          )
        );
      } else {
        alert(result.data.Error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = async (e) => {
    const leaveId = e.Leave_id;

    if (e.Status === "Accepted" || e.Status === "Rejected") {
      return;
    }

    const postData = {
      leaveId: leaveId,
      Status: "Rejected",
    };

    try {
      const result = await axios.post(
        "http://localhost:4000/admin/leave/reject",
        postData
      );

      if (result.data) {
        await sendEmail(leaveId, "Rejected");

        setLeave((prevLeave) =>
          prevLeave.map((leaveItem) =>
            leaveItem.Leave_id === leaveId
              ? { ...leaveItem, Status: "Rejected" }
              : leaveItem
          )
        );
      } else {
        alert(result.data.Error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendEmail = (leaveId, status) => {
    const employeeName = leave[0].Name;

    fetch("https://formsubmit.co/ajax/manish@mushroomworldbpl.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Message: `Hai ${employeeName}, Your leave has been ${status.toUpperCase()}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Email sent successfully");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3 className="mt-3">Leave List</h3>
      </div>
      <div className="mt-5">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>From_date</th>
              <th>To_date</th>
              <th>Reason</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leave.map((e) => (
              <tr key={e.Leave_id}>
                <td>{e.Name}</td>
                <td>{e.Email}</td>
                <td>{e.From_date}</td>
                <td>{e.To_date}</td>
                <td>{e.Reason}</td>
                <td>
                  {e.Status === "pending" ? (
                    <>
                      <button
                        className="btn btn-info btn-sm me-2"
                        onClick={() => handleAccept(e)}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleReject(e)}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <div>{e.Status}</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leavelist;
