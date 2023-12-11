import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ListOfStudents.css";

const ListOfStudents = () => {
  const [students, setStudents] = useState([]);

  async function fetchStudents() {
    const response = await axios.get("http://localhost:3002/getStudentUsers");

    setStudents(response.data);
  }

  console.log("students:", students);

  useEffect(() => {
    fetchStudents();
    return () => {};
  }, []);

  const deleteStudent = async (studentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3002/deleteStudentUser/${studentId}`
      );
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="container">
      <h1>List of Students</h1>
      <div className="students-list">
      {students.map((student) => {
        const { _id, firstName, lastName } = student;
        return (
          <div key={_id} className="student">
            <div className="student-content">
              <h2>
                Name: {lastName}, {firstName}
              </h2>
              <button onClick={() => deleteStudent(_id)}>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default ListOfStudents;
