import React, {useState} from "react";
import {useRef} from "react";
import "../styles/Contact.css";
import ContactBackground from "../public/assets/ContactBg.png";
import emailjs from "@emailjs/browser";
import Navbar from "../components/Navbar";



const Contact = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(false);
    const form = useRef();

    const emailValidation = (e) => {
        var pattern = /^[^ ]+\.[a-z]{2,3}$/;
        var emailValue = e.target.value;
        setEmail(emailValue);
        if(email.match(pattern)) {
            setMessage(true);
        } else {
            setMessage(false);
        }
    };
    
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
        .sendForm(
          "service_hn3kl0e",
          "template_1n6egmu",
          form.current,
          "zQAJxa5vmYMtxNMsV"
        )
        .then(
          (result) => {
            console.log(result.text);
            alert("Submitted!");
            setEmail("");
          },
          (error) => {
            console.log(error.text);
          }
        );
    };
   
    return (
        <div className="contact-page-wrapper">
            <Navbar/>
            <div className="contact-background-image-container">
                <img src={ContactBackground} alt="" className="C-Bg"/>
            </div>
            <h1 className="primary-he">Have Question In Mind?</h1>
            <h1 className="primary-h">Let Us Help</h1>
            <form ref={form} onSubmit={sendEmail}>
            <div className={
                    email.length === 0 
                    ? "contact-form-container fill-email" 
                    : message 
                    ? "contact-form-container valid-email" 
                    : "contact-form-container invalid-email"
                }>
                <input 
                type="text"
                name="user_email"
                className={
                    email.length === 0 
                    ? "input-control fill-email" 
                    : message 
                    ? "input-control valid-email" 
                    : "input-control invalid-email"
                }
                placeholder="Email address"
                autoComplete="off"
                onChange={emailValidation}
                value={email}
                required 
                />
                <div className={
                    email.length === 0 
                    ? "icon fill-color" 
                    : message 
                    ? "icon check-color" 
                    : "icon error-color"
                  }
                >
                    <i 
                        className={
                            email.length === 0 
                            ? "fa-solid fa-exclamation-circle" 
                            : message 
                            ? "fa-solid fa-check-circle" 
                            : "fa-solid fa-xmark-circle"

                            }
                        ></i>
                </div>
            </div>
            <button onClick={sendEmail} className="s-button" >Submit</button>
            </form>
            <div>
                    <p 
                        className={
                            email.length === 0 
                            ? "text-message fill-color" 
                            : message 
                            ? "text-message valid-email" 
                            : "text-message invalid-email"
                            }
                           >
                            {email.length === 0 
                            ? " " 
                            : message 
                            ? "The email you entered is valid" 
                            : "The email you entered is invalid"
                            }
                        </p>
            </div>
        </div>
    );
};

export default Contact;