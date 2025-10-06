import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EmployeeForm.css";

function EmployeeForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch("http://localhost:8085/api/departments")
      .then(res => res.json())
      .then(data => setDepartments(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8085/api/employees/${id}`)
        .then(res => res.json())
        .then(emp => {
          setFirstName(emp.firstName);
          setLastName(emp.lastName);
          setEmail(emp.email);
          setAge(emp.age);
          setDepartmentId(emp.department.id);
        })
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      firstName,
      lastName,
      email,
      age: Number(age),
      department: { id: Number(departmentId) }
    };

    const method = id ? "PUT" : "POST";
    const url = id
      ? `http://localhost:8085/api/employees/${id}`
      : "http://localhost:8085/api/employees";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) throw new Error("Erreur lors de l'enregistrement");
        return res.json();
      })
      .then(() => navigate("/employees"))
      .catch(err => console.error(err));
  };

  return (
    <div className="form-container">
      <h2>{id ? "Modifier Employé" : "ADD EMPLOYEE"}</h2>
      <form className="employee-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="First Name*"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Last Name*"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Age*"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
  <select
    value={departmentId}
    onChange={(e) => setDepartmentId(e.target.value)}
    required
    style={{ color: departmentId ? '#374151' : '#9ca3af' }}
  >
    <option value="" disabled hidden>Department *</option>
    {departments.map(dep => (
      <option key={dep.id} value={dep.id}>{dep.name}</option>
    ))}
  </select>
</div>
        <button className="submit-btn" type="submit">
          {id ? "Save Changes" : "Save"}
        </button>
      </form>
    </div>
  );
}

export default EmployeeForm;
