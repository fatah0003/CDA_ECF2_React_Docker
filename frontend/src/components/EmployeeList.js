import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EmployeeList.css";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchEmployees = () => {
    setLoading(true);
    fetch("http://localhost:8085/api/employees")
      .then(res => {
        if (!res.ok) throw new Error("Erreur lors du chargement des employés");
        return res.json();
      })
      .then(data => {
        setEmployees(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet employé ?")) {
      fetch(`http://localhost:8085/api/employees/${id}`, { method: "DELETE" })
        .then(res => {
          if (!res.ok) throw new Error("Erreur lors de la suppression");
          fetchEmployees();
        })
        .catch(err => console.error(err));
    }
  };

  const filteredEmployees = employees.filter(
    emp =>
      emp.firstName.toLowerCase().includes(search.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Chargement des employés...</p>;

  return (
    <div className="employee-list-container">
      <h1>Employees</h1>

      <button className="add-btn" onClick={() => navigate("/add-employee")}>
        ADD EMPLOYEE
      </button>

      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      {filteredEmployees.length === 0 ? (
        <p>Aucun employé trouvé.</p>
      ) : (
        <table>
          <thead>
            <tr>
              {["First Name", "Last Name", "Email", "Actions"].map(title => (
                <th key={title}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.email}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/edit-employee/${emp.id}`)}
                  >
                    EDIT
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(emp.id)}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EmployeeList;
