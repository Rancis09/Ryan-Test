import React, { useState } from 'react';
import './LoginSignup.css';
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../LandingPage/components/Navbar';

import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import eye_icon from '../Assets/hide.png';
import eye_slash_icon from '../Assets/view.png';
import { useUserDataAtom } from '../../hooks/user_data_atom';

export const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [userType, setUserType] = useState("student");
  // Initialize user type to "student"
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useUserDataAtom();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate();


  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (userType === "student") {
      
    console.log('userData:', userData)
      axios.post('http://localhost:3002/loginsignupstudent', { email, password })
        .then(result => {
          console.log(result)
          
          if (result.data.status === "Success") {

            console.log(result.data.userStudent)
            setUserData(result.data.userStudent)
            // localStorage.setItem('token', token);
            // console.log('Token:', token)
            localStorage.setItem('userData', JSON.stringify(result.data.userStudent));
            setTimeout(() => {
              navigate('/studenthomepage');

            }, 2000);
          }
          else if (result.data === "Password is incorrect") {
            console.log('hello worldo')
            setErrorMessage("Incorrect password.");
          }
          else if (result.data === "No record existed") {
            console.log('hello worldo')
            setErrorMessage("No record existed.");
          }
          else {
            
            // Update the error message state
            setErrorMessage("Incorrect username or password.");
          }
        })
        .catch(err => {
          console.log(err);
          // Update the error message state for any other errors
          setErrorMessage("An error occurred. Please try again.");
        });
    }
    else if (userType === "teacher") {
      const params = {
        email,
        password
      }
      
    console.log('userData:', userData)
      axios.get('http://localhost:3002/loginsignupteacher', { params })
        .then(result => {
          if (result.data.status === "Success") {
            console.log(result.data);

            setUserData(result.data.userTeacher)
            localStorage.setItem('userData', JSON.stringify(result.data.userTeacher));

            setTimeout(() => {
              navigate('/teacherhomepage');
            }, 2000);
          }
          else if (result.data === "Password is incorrect") {
            setErrorMessage("Incorrect password.");
          }
          else if (result.data === "No record existed") {
            setErrorMessage("No record existed.");
          }
          else {
            // Update the error message state
            setErrorMessage("Incorrect username or password.");
          }
        })
        .catch(err => {
          console.log(err);
          // Update the error message state for any other errors
          setErrorMessage("An error occurred. Please try again.");
        });
    }
  }




  return (
    <div className='containers'>
      <Navbar />
      <div className='container1' id="login">
        <div className="headerad">
          <div className="textLogin">{action}</div>
          <div className="underline"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputs">

            {action === "Login" ? <div></div> :
              <div className="input">
                <img src={user_icon} alt="" />
                <input type="text" placeholder='Name' />
              </div>}
            <div className="input1">
              <div className='email-icon'>
                <img src={email_icon} alt="" />
              </div>
              <input type="email" placeholder='Email' required onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="input1">
              <div className='password-icon'>
                <img src={password_icon} alt="" />
              </div>

              <input
                type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword state
                placeholder='Password' required onChange={(e) => setPassword(e.target.value)}
              />
              <div className='password-viewer' onClick={togglePasswordVisibility}>
                <img src={showPassword ? eye_slash_icon : eye_icon} alt="Toggle Password" />
              </div>
            </div>

            {action === "Login" ? (
              <div className="user-type">
                <button
                  className={userType === "student" ? "user-type-button active" : "user-type-button"}
                  onClick={() => handleUserTypeChange("student")}
                >
                  Login as Student
                </button>
                <button
                  className={userType === "teacher" ? "user-type-button active" : "user-type-button"}
                  onClick={() => handleUserTypeChange("teacher")}
                >
                  Login as Teacher
                </button>
              </div>
            ) : null}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </div>

          {action === "Login" ? (
            <div className="forgot-password"><a href='./forgotpassword'>Forgot Password</a><span>?</span></div>
          ) : null}
          <div className="create-account">
            <p>Don't have an account yet? Create account as <Link to='/teachersignup'>Teacher</Link> or <Link to='/studentsignup'>Student</Link>.</p>
          </div>

        </form>
      </div>
    </div>
    
  );
}
