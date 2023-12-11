import React from 'react'
//import from loginsignup.css
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import email_icon from '../Assets/email.png';
import axios from 'axios'
import Navbar from '../LandingPage/components/Navbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';


export function ForgotPassword() {
    const [email, setEmail] = useState()
    
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3002/forgotpassword', {email})
        .then(res => {
            if(res.data.Status === "Success") {
                setSuccessMessage('Password reset link sent successfully.');
                setErrorMessage('');
                setTimeout(() => {
                  navigate('/loginsignup');
                }, 2000);
            } else {
                setErrorMessage('Invalid email. Please enter a registered email.');
          // Optionally, you can clear the success message if it was set previously
                navigate('/forgotpassword')
            }
        }).catch(err => console.log(err))
    }

    return(
        <div className='containers'>
            <Navbar/>
        <div className='container1' id="login">
        <div className="FPheader">
        <div className="FPtext">Forgot Password</div>
        <div className="FPunderline"></div>
      </div>
      <div className="messagebelowforgotpassword">
        <p>Enter the email address you registered for your Cour-Cert Account, and we will send you an email message with password reset information.</p>
        </div>

        <form onSubmit={handleSubmit}>
        <div className="input1">
          <div className='email-icon'>
          <img src={email_icon} alt="" />
          </div>
          <input type="email" placeholder='Email' required onChange={(e) => setEmail(e.target.value)} />
        </div>
        
        <div className="FPheader"><div className="FPunderline"></div></div>

        <div className="FPbuttons">
        <button className="btn btn-cancel w-100 rounded-0" onClick={() => navigate('/loginsignup')}
          >
            Cancel
          </button>  

          <button type="submit" className="btn btn-success w-100 rounded-0"
          >
            Send Password Reset Link
          </button>
          </div>

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

        {errorMessage && 
          <div className='error-message'>
            <Stack sx={{ width: 292 }} spacing={2} position={'absolute'} marginTop={3}>
               <Alert severity="error">
                 <AlertTitle>Error</AlertTitle>
                  {errorMessage}
                </Alert>
            </Stack>
          </div>}
          </form>
      </div>
    </div>
    )
}