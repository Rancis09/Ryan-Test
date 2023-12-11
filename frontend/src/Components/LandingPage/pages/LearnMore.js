import React from "react";
import ABackground from "../public/assets/AboutBg.png";
import "../styles/LearnMore.css";
import Navbar from "../components/Navbar";

const LearnMore = () => {
    return(
        <div className="Wrapper">
            <Navbar/>
            <div className="LearnMore-background-container">
                <img src={ABackground} alt="" className="LMBg" />
            </div>
            <div className="section-context">
                <h1>Our Mission</h1>
                <p>
                At Cour-Cert, our mission is to provide a diverse range of online courses that cater to the unique learning needs of our global community. We are committed to making education accessible to anyone, anywhere, regardless of their background or location. Our courses are designed and curated by experts in their respective fields to ensure excellence and relevance. We keep our courses affordable, allowing learners from all walks of life to acquire new skills and knowledge. We embrace technology and pedagogical innovation to create engaging and interactive learning experiences. Cour-Cert is dedicated to building a supportive online learning community where learners can connect, collaborate, and grow together. We empower individuals to enhance their careers, pursue their passions, and make a positive impact on their lives and the world. We continuously improve our platform and course offerings based on learner feedback and emerging trends. Through these principles, we aim to become a trusted and indispensable partner in the lifelong learning journey of our users, helping them achieve their goals and aspirations.
                </p>
                <h1>Our Vision</h1>
                <p>
                At Cour-Cert, we envision a world where accessible, high-quality education knows no boundaries. Our vision is to empower individuals across the globe to unlock their full potential through convenient, affordable, and engaging online courses. We strive to create a digital learning ecosystem that fosters lifelong learning, career advancement, and personal growth.
                </p>
            </div>
        </div>
    )
}

export default LearnMore;