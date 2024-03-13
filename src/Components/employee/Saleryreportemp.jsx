import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";

const Saleryreportemp = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [salery, setSalery] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState(null);

  var Empid = localStorage.getItem("empid");

  const handleDownload = () => {
    if (salery.length === 0 || !employeeDetails) {
      console.error("Salary data or employee details not available.");
      return;
    }

    const filteredSalery = salery.filter(
      (entry) => entry.Year === selectedYear && entry.Month === selectedMonth
    );

    const pdf = new jsPDF();

    const currentMonth = selectedMonth;
    pdf.setFontSize(18);
    pdf.setTextColor(0, 123, 255);
    pdf.text(
      `${currentMonth} ${selectedYear} Salary Report`,
      105,
      15,
      "center"
    );

    pdf.setFontSize(14);
    pdf.setTextColor(85, 85, 85);
    pdf.text(
      `Employee Name: ${employeeDetails.Employee_Name}`,
      105,
      30,
      "center"
    );
    pdf.text(
      `Department: ${employeeDetails.Department} | Job Title: ${employeeDetails.Job_Title}`,
      105,
      45,
      "center"
    );

    pdf.setLineWidth(0.1);
    pdf.setDrawColor(0);
    pdf.setFontSize(12);

    pdf.setFillColor(0, 123, 255);
    pdf.rect(15, 55, 180, 16, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.text("Account Number", 30, 65);
    pdf.text("Salary", 70, 65);
    pdf.text("Month", 120, 65);
    pdf.text("Year", 170, 65);

    let yPos = 75;
    pdf.setTextColor(0);
    filteredSalery.forEach((entry) => {
      pdf.setFillColor(255, 255, 255);
      pdf.rect(15, yPos, 180, 10, "F");

      pdf.text(entry.Account_Number, 30, yPos + 8);
      pdf.text(entry.Salary.toString(), 70, yPos + 8);
      pdf.text(entry.Month, 120, yPos + 8);
      pdf.text(entry.Year, 170, yPos + 8);

      yPos += 10;
    });

    pdf.setFillColor(200, 200, 200);
    pdf.rect(15, yPos, 180, 8, "F");
    pdf.setTextColor(0, 0, 0);
    pdf.text(
      `Report for ${currentMonth} ${selectedYear}`,
      105,
      yPos + 25,
      "center"
    );

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    pdf.text(
      `Downloaded on ${formattedDate} at ${formattedTime}`,
      105,
      yPos + 40,
      "center"
    );

    const pdfContent = pdf.output("datauristring");
    const newTab = window.open();
    newTab.document.write(
      '<iframe width="100%" height="100%" src="' +
        pdfContent +
        '" frameborder="0" allowfullscreen></iframe>'
    );
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/salary/${Empid}`)
      .then((result) => {
        setSalery(result.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:4000/employee/getEmployee/${Empid}`)
      .then((result) => {
        setEmployeeDetails(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const uniqueYears = Array.from(new Set(salery.map((e) => e.Year)));
  const uniqueMonths = Array.from(new Set(salery.map((e) => e.Month)));

  const filteredData = salery.filter((e) => {
    return (
      (selectedYear === "" || e.Year === selectedYear) &&
      (selectedMonth === "" || e.Month === selectedMonth)
    );
  });
  return (
    <div>
      <div className="px-5 mt-3">
        <div className="d-flex justify-content-center">
          <h3>Salary report</h3>
        </div>
        <br />

        <div className="d-flex">
          <select
            className="form-select me-2"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Select Year</option>
            {uniqueYears.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>

        
          <select
            className="form-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">Select Month</option>
            {uniqueMonths.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-3">
          <table className="table">
            <thead>
              <tr>
                <th>Account_Number</th>
                <th>Salary</th>
                <th>Last Update</th>
                <th>Month</th>
                <th>Year</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((e, index) => (
                <tr key={index}>
                  <td>{e.Account_Number}</td>
                  <td>{e.Salary}</td>
                  <td>{e.Last_update}</td>
                  <td>{e.Month}</td>
                  <td>{e.Year}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() =>
                        handleDownload(
                          e.Account_Number,
                          e.Salary,
                          e.Last_update,
                          e.Month,
                          e.Year
                        )
                      }
                    >
                      View Report
                    </button>
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

export default Saleryreportemp;
