import React from "react";
import AboutBackground from "../public/assets/AboutBg.png";
import "../styles/About.css";
import { HashLink as Link } from "react-router-hash-link";
import Navbar from "../components/Navbar";

const About = () => {
    return(
        <section>
            <Navbar/>
        <div className="about-section-container">
            <div className="about-background-image-container">
                 <img src={AboutBackground} alt="" className="Background"/>
            </div>
            <div className="about-section-text-container">
                 <h1 className="p-heading">
                    About Our Online Courses: "Empowering Your Learning Journey"
                </h1>
                <p className="p-text">
                    At Cour-Cert, we're dedicated to transforming your learning experience. Join us on a journey of knowledge and growth, where every click takes you closer to your goals
                </p>
                <p className="p-text">
                    Our team of passionate educators and experts is committed to providing you with high-quality, engaging content that's tailored to your needs. Whether you're looking to advance your career, acquire new skills, or explore a personal interest, our online courses offer a convenient and flexible way to achieve your objectives. Discover the endless possibilities of online learning with us.
                </p>
                <div className="about-buttons-container">
                    <Link to="/About/LearnMore" className="button">Learn More</Link>
                </div>
            </div>
        </div>
        </section>
    );
};

export default About;