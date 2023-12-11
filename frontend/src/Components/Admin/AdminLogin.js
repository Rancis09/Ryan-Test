import React, { Component, useState } from "react";
import AdminLoginImg from "../Assets/AdminLoginImg.png";
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HashLink as Link } from "react-router-hash-link";


export default function AdminLogin() {

    const history = useNavigate();

    const [email, setEmail ] = useState("");
    const [password, setPassword ] = useState("");

    async function submit(e) {
        e.preventDefault();

        try{
            await axios.post("http://localhost:3000/Admin", {
                email,password
            })
            .then(res => {
                if(res.data==="exist"){
                    history("/Admin/Home")
                }
                else if(res.data==="not exist"){
                    alert("Invalid User, Please try again!")
                }
            })
            .catch(e => {
                alert("Wrong details")
                console.log(e);
            })
        }   
        catch(e) {
            console.log(e);
        }
    }
    

    return (
        <div className="Admin-Container">

            <div className="Admin-input-control">
                <form className="Admin-input-container" onSubmit={submit}>
                    <h2 className="Admin-header">LOGIN</h2>
                    <div className="input-text">
                        <label>User Name</label>
                        <input 
                        type ="text"
                        className="input-t"
                        onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>
                    <div className="input-text">
                        <label>Password</label>
                        <input 
                        type="password"
                        className="input-t"
                        onChange={(e) => { setPassword(e.target.value) }}
                        />
                    </div>
                    <div className="Admin-checkbox">
                        <p className="Admin-c1">
                            <input 
                                className="Admin-c2"
                                type="checkbox"
                            />
                             Remember Me
                        </p>
                        <Link to="/Admin/ForgotPassword" className="FP">Forgot Password?</Link>
                    </div>
                    <Link to="/Admin/Home" className="Admin-button" >Login</Link>
                </form>
            </div>
            <div className="Admin-background">
                <img src={AdminLoginImg} alt="" className="Admin-background-control"/>
            </div>
        </div>
    );
};

