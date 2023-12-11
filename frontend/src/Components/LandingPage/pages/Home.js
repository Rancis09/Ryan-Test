import "../styles/Home.css";
import { Component } from "react";
import BackGround from "../public/assets/Bg.png";
import { FiArrowRight } from "react-icons/fi";
import { HashLink as Link } from "react-router-hash-link";
import Navbar from "../components/Navbar";


class Home extends Component {
    render() {
    return (
        <section>
            <Navbar/>
        <div className = "home-container">
            <div className ="home-banner-container">
                <div className="home-bannerImage-container">
                    <img src ={BackGround} alt="My BackGround" className="Bg"/>      
                </div>
                <div className="home-text-section">
                    <h1 className="first-heading">
                        Digital Solution
                    </h1>
                    <h1 className="second-heading">Explore Our Courses</h1>
                    <p className="primary-text">
                        "Education Elevated, Certification Validated"
                    </p>
                    <Link to="/MoreDetails" className="secondary-button">
                        More Details <FiArrowRight/>
                    </Link>
                </div>
            </div>
        </div>
        </section>
      )
    }
}

export default Home;