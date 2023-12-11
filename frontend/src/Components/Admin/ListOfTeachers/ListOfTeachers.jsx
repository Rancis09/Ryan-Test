import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ListOfTeachers.css";

const ListOfTeachers = () => {
  const [teachers, setTeachers] = useState([]);

  async function fetchTeachers() {
    const response = await axios.get("http://localhost:3002/getTeachersUsers");

    setTeachers(response.data);
  }

  console.log("teachers:", teachers);

  useEffect(() => {
    fetchTeachers();
    return () => {};
  }, []);
  const deleteTeacher = async (teacherId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3002/deleteTeacherUser/${teacherId}`
      );
      fetchTeachers();
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  return (
    <div className="container">
      <h1>List of Teachers</h1>
      <div className="teachers-list">
        {teachers.map((teacher) => {
          const { _id, firstName, lastName } = teacher;
          return (
            <div key={_id} className="teacher">
              <div className="teacher-content">
                <h2>
                  Name: {lastName}, {firstName}
                </h2>
                <button onClick={() => deleteTeacher(_id)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListOfTeachers;
