import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import './StudentViewCourse.css';
import axios from 'axios'
import { useUserDataAtom } from '../../hooks/user_data_atom';
import ReactPaginate from 'react-paginate';

export const StudentViewCourse = () => {
    const [count, setCount] = useState(0);
    const [checked, setChecked] = useState(0);
    const [percentage, setPercentage] = useState(0)
    const [courses, getCourses] = useState([])
    const [userData, setUserData] = useUserDataAtom();
    const userId = userData._id
    const [currentPage, setCurrentPage] = useState(0);
    const coursesPerPage = 6;

    console.log("user ID:" + userId);
    axios.defaults.withCredentials = true;

    useEffect(() => {

        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
          setUserData((prevUserData) => {
            const newUserData = JSON.parse(storedUserData);
            // Assuming that newUserData has the same structure as your existing user data
            return { ...prevUserData, ...newUserData };
          });
        }
        const userId = userData._id;

        axios.get('http://localhost:3002/getEnrolledcourses', {
            params: {
                id: userId
            }
        })
        .then(response => {
            getCourses(response.data);
            console.log("Token2: " + response.data);
        })
        .catch(err => console.log(err));
    }, [setUserData, userData._id]);

    function handlePageClick(selectedPage) {
      setCurrentPage(selectedPage.selected);
  }


    const offset = currentPage * coursesPerPage;
    const currentCourses = courses.slice(offset, offset + coursesPerPage);
  
    return(
        <div className='addcoursecontainer'>
            <nav className='first-nav'>
                <div class="first-nav-logo">
                    <img src="Logo1.1.png" alt="Cour-Cert"></img>
                </div>
                <div className='first-nav-title'>
                    <p className='p1'> Course-Certification</p>
                    <div className='first-nav-title1'>
                        <p className='p2'> "Empowering Your Learning Journey"</p>
                    </div>
                </div>
            </nav>
            <nav className='second-nav'>
                <div class="second-nav-links">
                    <ul>
                        <li><Link to="/allcourselist"> Available Courses</Link> </li>
                        <li><Link to="/studentviewcourse"> View My Course</Link> </li>
                        <li><Link to="/profilepage"> Account Profile</Link> </li>
                        <li><Link to="/studenthomepage"> Back</Link> </li>
                    </ul>
                </div>
            </nav>
            <div className='detail'>
                <div>
                    List of courses
                </div>
                {currentCourses.map(course => {
                    return (
                        <div className='course-box'>
                            <div className='title1' key={course._id}>
                                <Link to={`/courseviewpage?title=${course.course_title}&description=${course.course_description}&id=${course.course_id}`}>
                                {course.course_title}
                                </Link>
                                {console.log("course ID:" + course.course_id)}
                            </div>
                            <div className='Courses'>
                                <div className='description1'>
                                    <p>
                                        {course.course_description}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                    )
                })}
                <div className='paging'>
                <ReactPaginate
                className='Paginate'
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={Math.ceil(courses.length / coursesPerPage)}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                />
                </div>
               
            </div>
            </div>  
            );      
}



