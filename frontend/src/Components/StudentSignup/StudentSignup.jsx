import React, { useState } from 'react';
import './StudentSignup.css';
import { useNavigate , Link } from 'react-router-dom';
import axios from 'axios'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export function StudentSignup() 
{
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      //backend website for database storing
      const response = await axios.post('http://localhost:3002/studentsignup', {
        firstName,
        lastName,
        email,
        password,
        birthDate,
        gender,
      });

      console.log(response.data);

      // Check if the response contains an error message
      if (response.data === 'Email already in use.') {
        setErrorMessage('Email is already in use.');
      } else {
        // Successful registration
        setSuccessMessage('Sign up successful! Redirecting to login...');
        setErrorMessage(''); // Clear any existing error message
        // Redirect to login after a delay
        setTimeout(() => {
          navigate('/loginsignup');
        }, 2000); // Adjust the delay as needed
      }
    } catch (error) {
      console.error(error);
      // Handle other errors if needed
      setErrorMessage('An error occurred. Please try again.');
    }
  };


  return(
    <div className='createpagestudent'>
        <div className='container2'>
        <form onSubmit={handleSubmit}>
          <h1> Sign Up</h1>
          <div className='createinput'>
            <img src='person.png' alt='' />
            <input
              type='name'
              id='firstName'
              placeholder='First Name'
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className='createinput'>
            <img src='person.png' alt='' />
            <input
              type='name'
              id='lastName'
              placeholder='Last Name'
              required
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className='createinput'>
            <img src='email.png' alt='' />
            <input
              type='email'
              id='email'
              placeholder='Email'
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='createinput'>
            <img src='password.png' alt='' />
            <input
              type='password'
              id='password'
              placeholder='Password'
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='createinput'>
            <img src='password.png' alt='' />
            <input
              type='password'
              id='confirm'
              placeholder='Confirm Password'
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className='label-row'>
            <div className='student-datelabel'>
              <p>Date of Birth</p>
            </div>
            <div className='student-genderlabel'>
              <p>Gender</p>
            </div>
          </div>


{/* birthdate */}
        <div className='row'>
          <div className='date'>
            <input
              type='date'
              id='birthdate'
              required
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>

{/* gender */}
          <div className='Gender'>
            <select
                name='select'
                id='gender'
                defaultValue='Select Gender'
                required
                 onChange={(e) => setGender(e.target.value)}
            >
              <option disabled={true} value='Select Gender'> Select Gender </option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </select>
          </div>
       </div>
          <div className='signupbutton'>
            <button type='submit' id='sub'>
              Sign Up
            </button>
          </div>
          <div className='hrefs'>
            <p>
              Already have an account? <Link to='/loginsignup'>Login</Link>
            </p>
          </div>
        </form>
        {/* Display success message if present  */}
      {successMessage && 
          <div className='success-message'>
            <Stack sx={{ width: 300 }} spacing={2} position={'absolute'}  marginLeft={7} marginTop={2}>
               <Alert severity="success">
                 <AlertTitle>Success</AlertTitle>
                 {successMessage}
                </Alert>
            </Stack>
          </div>
            }


          {/* Display error message if present  */}
          {errorMessage && 
          <div className='error-message'>
            <Stack sx={{ width: 292 }} spacing={2} position={'absolute'} marginTop={3}>
               <Alert severity="error">
                 <AlertTitle>Error</AlertTitle>
                  {errorMessage}
                </Alert>
            </Stack>
          </div>}
      </div>  
    </div>
  );
}

