import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import StudentForm from "../components/StudentForm";
import Navbar from "../components/Navbar";

export default function Students() {
  const { token } = useAuth();
  const [students, setStudents] = useState([]);

  async function load() {
    const { data } = await api.get("/students");
    setStudents(data);
  }

  useEffect(() => { if (token) load(); }, [token]);

  return (
    <>
      <Navbar />
      <div className="container">
        <StudentForm reload={load} />

        <table>
          <thead>
            <tr>
              <th>Name</th><th>Roll</th><th>Email</th>
              <th>Physics</th><th>Chemistry</th><th>Biology</th>
              <th>Total</th><th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map(s => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.rollNumber}</td>
                <td>{s.email}</td>
                <td>{s.marks?.subject1 ?? 0}</td>
                <td>{s.marks?.subject2 ?? 0}</td>
                <td>{s.marks?.subject3 ?? 0}</td>
                <td>{(s.marks?.subject1||0)+(s.marks?.subject2||0)+(s.marks?.subject3||0)}</td>
                <td>
                  {/* TODO: edit + delete buttons */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
