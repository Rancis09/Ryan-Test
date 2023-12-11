import React from "react";
import MDBackground from "../public/assets/MoreDetailsBg.png";
import Content1 from "../public/assets/Content1.png";
import Content2 from "../public/assets/Content2.png";
import Content3 from "../public/assets/Content3.png";
import "../styles/MoreDetails.css";
import Navbar from "../components/Navbar";


const MoreDetails = () => {
    return(
        <div className="More-section-Wrapper">
            <Navbar/>
            <h1 className="first-header">Embark and Learn</h1>
            <div className="MoreDetails-background-image-container">
                <img src = {MDBackground} alt = "" className="Bg1"/>
            </div>
            <div className="section-position">
                <img src = {Content1} alt="" className="pic1"/>
                <div className="section-content">
                    <h2 className="title">Interact With Professor</h2>
                    <p className="description">
                        At Cour-cert, we understand the importance of a personalized and engaging learning experience. That's why we've designed our platform to provide you with the unique opportunity to interact directly with your professors. Gone are the days of feeling like just another face in the crowd. With our interactive features, you can ask questions, seek clarification, and engage in meaningful discussions with your knowledgeable instructors. Whether it's through live virtual sessions, discussion forums, or one-on-one messaging, you'll have the chance to connect with educators who are passionate about your success. Harness the power of real-time communication and make the most of your online learning journey by building valuable relationships with the experts guiding your path to knowledge.

                    </p>    
                </div>
            </div>
            <div className="section-position">
                <div className="section-content">
                    <h2 className="title">Choose Your Course</h2>
                    <p className="description">
                    Your learning journey takes center stage. Explore a rich tapestry of knowledge as you handpick the course that aligns perfectly with your goals and interests. Whether you're charting a career path, delving into a passion, or seeking personal growth, we offer a diverse array of meticulously crafted courses. Dive into detailed course descriptions, uncover the expertise of our instructors, and decide which path resonates with your aspirations. Your educational adventure begins here, where choice is the compass, and knowledge is the destination. Take the first step towards a brighter future by choosing the course that ignites your curiosity and fuels your ambitions.

                    </p>    
                </div>
                <img src = {Content2} alt="" className="pic2"/>
            </div>
            <div className="section-position">
                <img src = {Content3} alt="" className="pic3"/>
                <div className="section-content">
                    <h2 className="title">Accomplish The Course</h2>
                    <p className="description">
                    Journey transforms into a rewarding adventure. Our platform empowers you to progress through your chosen course with confidence and achievement in mind. Immerse yourself in captivating lectures, interactive assignments, and stimulating discussions, all designed to elevate your understanding and expertise. Track your progress effortlessly, receive guidance from dedicated instructors, and connect with fellow learners who share your passion. As you advance, milestones become markers of your accomplishment, and each completed module propels you closer to mastery. Your educational success is not a destination but a dynamic expedition, where the culmination of effort and knowledge fuels your growth. Join us on this transformative path and experience the satisfaction of accomplishing your course goals, one step at a time.

                    </p>    
                </div>
            </div>
        </div>
    );
};

export default MoreDetails;