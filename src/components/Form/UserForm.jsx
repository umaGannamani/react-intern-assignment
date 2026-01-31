import { useState } from "react";

export default function UserForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    id: "",
    password: "",
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  // store submitted data
  setSubmittedData(formData);

  // clear the form (reset to initial state)
  setFormData({
    name: "",
    email: "",
    id: "",
    password: "",
  });

  // optional: reset password visibility
  setShowPassword(false);
};


  return (
    <div className="form-container">
      <h2 className="form-heading">Form Handling & Password Toggle</h2>

      <form className="form-box" onSubmit={handleSubmit}>
        {/* Name */}
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter name"
        />

        {/* Email */}
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
        />

        {/* ID */}
        <label>ID</label>
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="Enter ID"
        />

        {/* Password */}
        <label>Password</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
          <button
            type="button"
            className="toggle-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      {/* Submitted Data */}
      {submittedData && (
        <div className="submitted-box">
          <h3>Submitted Data:</h3>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>ID:</strong> {submittedData.id}</p>
          <p><strong>Password:</strong> {submittedData.password}</p>
        </div>
      )}
    </div>
  );
}
