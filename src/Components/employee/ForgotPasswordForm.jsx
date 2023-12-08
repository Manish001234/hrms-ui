import { useState } from "react";
const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const sendResetLink = async (userEmail) => {
    try {
      const response = await fetch(
        `http://localhost:4000/employee/reset-password/request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ Email: userEmail }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        if (data) {
          const resetToken = data.resetToken;
          const resetLink = `http://localhost:5173/reset/${resetToken}`;
          const mailResponse = await fetch(
            `https://formsubmit.co/ajax/manish@mushroomworldbpl.com`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                email: userEmail,
                subject: "Password Reset",
                message: `Hello ${userEmail}!
                ....
 Click on below link to reset your password.
                 ${resetLink}
              `,
              }),
            }
          );
          if (mailResponse.ok) {
            alert("Reset link sent successfully");
            // Clear the form fields
            setEmail("");
          } else {
            alert("Unable to send reset link");
          }
        } else {
          alert("No user found for the provided email");
        }
      } else {
        alert("Error checking email and generating reset token");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendResetLink(email);
  };
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
        <div className="p-3 rounded w-25 border loginForm">
          <h2 className="text-center">Reset Password</h2>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="Email">
                <strong>Email:</strong>
              </label>
              <input
                type="email"
                name="Email"
                autoComplete="off"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control rounded-0"
              />
            </div>
            <br />
            <button className="btn btn-success w-100 rounded-0 mb-2">
              {" "}
              Send Reset link
            </button>
            <div className="mb-1"></div>
          </form>
        </div>
      </div>
    </>
  );
};
export default ForgotPasswordForm;
