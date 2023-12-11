import React from 'react'
//import from loginsignup.css
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import password_icon from '../Assets/password.png';
import axios from 'axios'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

import eye_icon from '../Assets/hide.png';
import eye_slash_icon from '../Assets/view.png';


export function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); };
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate()
    const {id, token} = useParams()

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
          }
          else{
            axios.post(`http://localhost:3002/resetpassword/${id}/${token}`, {password})
            .then(res => {
            if(res.data.Status === "Success") {
                setSuccessMessage('Sign up successful! Redirecting to login...');
                setErrorMessage('');
                setTimeout(() => {
                    navigate('/loginsignup');
                  }, 2000);
            } else {
              setErrorMessage('Password Reset Link Expired.');
              setTimeout(() => {
                window.opener = null;
                window.open("", "_self");
                window.close();
              }, 5000);
            }
        }).catch(err => console.log(err))
    }}

    return(
        <div className='containers'>
        <div className='container1' id="login">
        <div className="FPheader">
        <div className="FPtext">Reset Password</div>
        <div className="FPunderline"></div>
      </div>
      <div className="messagebelowresetpassword">
        <p>Please use a NEW password! For best account security, please do not re-use old passwords.</p>
        </div>

        <form onSubmit={handleSubmit}>
        <div className="input1">
          <div className='password-icon'>
          <img src={password_icon} alt="" />
          </div>
          <input
            type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword state
            placeholder='Password'  required onChange={(e) => setPassword(e.target.value)} 
          />
          <div className='password-viewer' onClick={togglePasswordVisibility}>
            <img src={showPassword ? eye_slash_icon : eye_icon} alt="Toggle Password" />
          </div>
        </div>
        <div style={{ marginBottom: '10px' }}></div>
        <div className="input1">
          <div className='password-icon'>
          <img src={password_icon} alt="" />
          </div>
          <input type="password" placeholder='Confirm New Password' required onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        

        
        
        <div className="FPheader"><div className="FPunderline"></div></div>
        <div className="FPbuttons">

          <button type="submit" className="btn btn-RSTsuccess w-100 rounded-0"
          >
            Set New Password
          </button>
          </div>
          <div className="messagebelowresetpassword">
        <p>

        <strong>Secure password tips:</strong><br />
            <br />• Use numbers, letters, and only these symbols:
            <br />&nbsp;&nbsp;@ # ! $ ^ & * : ( ) - = + [ ] { } | ?
            <br />• Use a password that is a minimum of eight characters long, alphanumeric, and case sensitive.
            <br />• Use a different password for each web site you use.
            <br />• Do not use the same password as your email service account.
            <br />• Do not use an old password from an account that was hacked or shared.
        </p>
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