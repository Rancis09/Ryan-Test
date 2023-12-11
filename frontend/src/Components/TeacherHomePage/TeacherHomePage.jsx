import React, {useState, useEffect} from 'react';
import './TeacherHomePage.css'
import { useNavigate, Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from 'axios'
import { useUserDataAtom } from '../../hooks/user_data_atom';

export const TeacherHomePage = () => 
{
  const [open, setOpen] = useState(false);
  const [course_title, setCourseTitle] = useState('');
  const [course_description, setCourseDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  const [initialRequestComplete, setInitialRequestComplete] = useState(false);
  const [titleValid, setTitleValid] = useState(true); // Track the validity of the title input
  const [descriptionValid, setDescriptionValid] = useState(true);// Track the validity of the description input
  const [userData, setUserData] = useUserDataAtom();
  const navigate = useNavigate();

  // AUTHENTICATION

  console.log("data: " + userData._id);
  
  
  const [search, setSearch] = useState('');

  const handleSignout = () => {
    navigate('/login');
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      // Check if the input fields are empty
      if (course_title.trim() === '') {
        setTitleValid(false);
       return; // Don't proceed if the title is empty
      } else {
       setTitleValid(true);
      }

      if (course_description.trim() === '') {
        setDescriptionValid(false);
        return; // Don't proceed if the description is empty
      } else {
        setDescriptionValid(true);
      }

    
      try {
        const { _id } = userData

        //backend website for database storing
        const response = await axios.post('http://localhost:3002/teacher_AddCourse', {
          course_title,
          course_description,
          user_id: _id
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
            navigate('/teacherviewcourse');
          }, 2000); // Adjust the delay as needed
        }
      } catch (error) {
        console.error(error);
        // Handle other errors if needed
        setErrorMessage('An error occurred. Please try again.');
  }};


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    axios.defaults.withCredentials = true;
    useEffect(()=> {
      axios.get('http://localhost:3002/teacherhomepage')
      .then(result => {console.log(result)
          if(result.data !== "Success")
          {
              navigate('/loginsignup')
          }
      })
      .catch(err=> console.log(err))
      .finally(() => {
        setInitialRequestComplete(true);
      });
  }, []);
  
  const handleSearch = () => {
    axios
      .get(`http://localhost:3002/searchcourse?query=${searchQuery}`)
      .then((result) => {
        console.log(result);
        setSearchResults(result.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setSearchButtonClicked(true);
      })
  };

  if (!initialRequestComplete) {
    // Initial request still in progress
    return null; // or loading indicator if needed
  }

    return(
      <div className='teacherhomepage'>
       <nav className='navHomepage'>
          <div class ="app-logo1">
            <img src = "logo.png" alt= "Cour-Cert" height={160} width={100}></img>
          </div>
          <div class = "searchBar1">
            <input type = "text" 
            id="search-input" 
            placeholder="Search here" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            ></input>
           <button id="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        {searchResults !== null && searchResults.length > 0 ? (
  <div className="search-results">
    <h2>Search Results:</h2>
    <ul>
      {searchResults.map((course) => (
        <li key={course.id}>
          <Link to={`/course/${course.id}`}>{course.course_title}</Link>
        </li>
      ))}
    </ul>
  </div>
) : (
  searchButtonClicked && searchResults.length === 0 && (
    <div className="no-results-found">
      <p>No results found</p>
    </div>
  )
)}
          <div class ="nav-links1">
            <ul>
              <li><Link to = "/teacherviewcourse"> View Course</Link> </li>
              <li><Link to = "/teacherprofile"> Account Profile</Link> </li>
              <li>
              <Link to="/" onClick={handleSignout}>
                Signout
              </Link>
              </li>
             </ul>
           </div>
       </nav>
        <div className='addCourse'>
      <Button variant="outlined" onClick={handleClickOpen} >
        Add Course
      </Button>
      <Dialog open={open} onClose={handleClose} onSubmit={handleSubmit}>
        <DialogTitle>Add Courses</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Input Details Below:
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title of the Course?"
            type="text"
            fullWidth
            variant="standard"
            required
            onChange={(e) => {
              setCourseTitle(e.target.value);
              setTitleValid(e.target.value.trim() !== '');
            }}
            error={!titleValid}
          />

          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            required
            onChange={(e) => {
              setCourseDescription(e.target.value);
              setDescriptionValid(e.target.value.trim() !== '');
            }}
            error={!descriptionValid}
          />
        </DialogContent>
        <DialogActions>
          {/* Display error or success message if present */}
          {successMessage && <div className='success-message'>{successMessage}</div>}
          {errorMessage && <div className='error-message'>{errorMessage}</div>}
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
     </div>           
  );
}
