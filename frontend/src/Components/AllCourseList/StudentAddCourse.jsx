import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import React, { useEffect,useState } from 'react';
import { useUserDataAtom } from '../../hooks/user_data_atom';
import Button from "@mui/material/Button";
import axios from 'axios'
import './StudentAddCourse.css';
import {  useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';


export const StudentAddCourse = () => 
{
    
    const navigate = useNavigate();
    const [userData, setUserData] = useUserDataAtom();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const userId = userData._id
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [currentPage, setCurrentPage] = useState(0);
    const id = queryParams.get('id');

    const coursesPerPage = 6;

    console.log("data ID from view course: " + userId);

    //jwt
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
        axios.get('http://localhost:3002/getStudentcourses', {
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

    const handleSubmit = async (courseId, course_title, course_description) => {

        try {
          console.log("title:"+ courseId);

          //backend website for database storing
          const response = await axios.post('http://localhost:3002/student_AddCourse', {
            userId,
            courseId,
            course_title,
            course_description
          });
      
          // Check if the response contains an error message
          if (response.data === 'Course already added') {
            setErrorMessage('Course already added');
          } else {
            // setUserData(response.data)
             // Successful registration
            setSuccessMessage('Add Course Success!');
            setErrorMessage(''); // Clear any existing error message            
            // Redirect to view course after a delay
             setTimeout(() => {
              navigate ('/studentviewcourse')
            }, 2000); // Adjust the delay as needed
          }
        } catch (error) {
          console.error(error);
          // Handle other errors if needed
          setErrorMessage('An error occurred. Please try again.');
    }};


    const [search, setSearch] = useState('');
    const [courses, getCourses] = useState([]);

    function handlePageClick(selectedPage) {
        setCurrentPage(selectedPage.selected);
    }
    const offset = currentPage * coursesPerPage;
    const currentCourses = courses.slice(offset, offset + coursesPerPage);


    /* Expanding Text*/

    const ExpandableText = ({ children, descriptionLength }) => {
    const fullText = children;
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleText = () => {setIsExpanded(!isExpanded);};      

    return (
        <p className='text'>
          {isExpanded ? fullText : `${fullText.slice(0, descriptionLength)}...`}
          <span onClick={toggleText} className='toggle-button'>
            {isExpanded ? 'Show less' : 'Show more'}
          </span>
        </p>
      );
    };

    return(
        <div className='addcoursecontainer1'>
        <nav className='first-nav1'>
            <div class ="first-nav-logo1">
            <a href='/studenthomepage'>
                     <img src = "Logo1.1.png" alt=    "Cour-Cert"></img>
                </a>
         </div>
            <div className='first-nav-title1'>
                <p className='p1'> Course-Certification</p>
            <div className='first-nav-title1'>
            <p className='p2'> "Empowering Your Learning Journey"</p>
            </div>
        </div>
    </nav>
    <nav className='second-nav2'>
    <div className='studentsearch'>
    <input 
        type = "text" 
        id="search-input" 
        placeholder="Search here" 
        onChange={event=>{setSearch(event.target.value)}}></input>
    </div>
    <div class ="second-nav-links2">
        <ul>
          <li><a href = "/studentviewcourse"> My Course</a> </li>
          <li><a href = "/studenthomepage"> Back</a> </li>
         </ul>
       </div>
    </nav>

    <div className='Descript'>
        ALL COURSES AVAILABLE
    </div>
    <div className='details1'> 
         {successMessage && <div className='success-message'>{successMessage}</div>}
         {errorMessage && <div className='error-message'>{errorMessage}</div>}
        {currentCourses.map(course => {
            return (
                <div className='course-box' key={course._id}>
                <div className='titles1'>
                    <Link to={`/courseviewpage?title=${course.course_title}&description=${course.course_description}&id=${course._id}`}>
                        {course.course_title}
                    </Link>
                </div>
                <div className='Courses'>
                    <div className='description1'>
                        <p>
                        <ExpandableText descriptionLength={250}>
                            {course.course_description}
                            </ExpandableText>
                        </p>
                    </div>
                    <div className='enrollcourse'>
                        <Button type='submit' onClick={() => handleSubmit(course._id, course.course_title, course.course_description)}>
                            Enroll Course
                        </Button>
                    </div>
                </div>
            </div>
        )})
        }
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
         <div className='spaces'>
               </div>
    </div>
    </div>
    )
}

