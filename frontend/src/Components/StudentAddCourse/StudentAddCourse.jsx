import { useNavigate, Link } from 'react-router-dom';
import React, { useEffect,useState } from 'react';
import axios from 'axios'
import './StudentAddCourse.css';


export const StudentAddCourse = () => 
{
    const [search, setSearch] = useState('');
    const [courses, getCourses] = useState([]);

    useEffect( ()=>{
        axios.get('http://localhost:3002/getStudentcourses')
        .then(courses => getCourses(courses.data))
        .catch( err => console.log(err))
    },[])
    
    const navigate = useNavigate();
    return(
        <div className='addcoursecontainer1'>
        <nav className='first-nav1'>
            <div class ="first-nav-logo1">
            <Link to='/studenthomepage'>
                     <img src = "Logo1.1.png" alt=    "Cour-Cert"></img>
                </Link>
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
          <li><Link to = "/studenthomepage"> Back</Link> </li>
         </ul>
       </div>
    </nav>

    <div className='Descript'>
        ALL COURSES AVAILABLE
    </div>
    <div className='details1'> 
        {courses.map(course => {
            return (<div className='course-box'>
                <div className='titles1'>
                    <Link to='courseviewpage'>
                        {course.course_title}
                    </Link>  
                </div>
                <div className='Courses'>
                    <div className='description1'>
                        <p>{course.course_description}</p>
                    </div>
                    <div className='enrollcourse'>
                        <button type='submit' onClick={() => navigate('/mycourse')}>
                            Enroll Course
                        </button>
                    </div>
                </div>                    
            </div>
        )})
        }
    </div>
    <div className='space'>
    </div>
    </div>
    )
}

