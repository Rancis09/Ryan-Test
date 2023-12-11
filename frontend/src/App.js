import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/LandingPage/components/Navbar";
import Home from "./Components/LandingPage/pages/Home";
import About from "./Components/LandingPage/pages/About";
import Services from "./Components/LandingPage/pages/Services";
import Contact from "./Components/LandingPage/pages/Contact";
import MoreDetails from "./Components/LandingPage/pages/MoreDetails";
import LearnMore from "./Components/LandingPage/pages/LearnMore";
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminHomePage from "./Components/Admin/AdminHomePage";
import AdminForgotPass from "./Components/Admin/AdminForgotPass";
import { LoginSignup } from "./Components/LoginSignup/LoginSignup";
import { ForgotPassword } from "./Components/ForgotPassword/ForgotPassword";
import { ResetPassword } from "./Components/ResetPassword/ResetPassword";
import { TeacherHomePage } from "./Components/TeacherHomePage/TeacherHomePage";
import { TeacherSignup } from "./Components/TeacherSignup/TeacherSignup";
import { StudentSignup } from "./Components/StudentSignup/StudentSignup";
import { StudentHomePage } from "./Components/StudentHomePage/StudentHomePage";
import { ProfilePage } from "./Components/Profile/ProfilePage";
import { Trial } from "./Components/Trial/trial";
import { TeacherProfile } from "./Components/TeacherProfile/TeacherProfile";
import { TeacherAddCourse } from "./Components/TeacherAddCourse/AddCourse";
import { TeacherViewCourse } from "./Components/TeacherViewCourse/TeacherViewCourse";
import { StudentViewCourse } from "./Components/StudentViewCourse/StudentViewCourse";
import { StudentAddCourse } from "./Components/AllCourseList/StudentAddCourse";
import { CourseViewPage } from "./Components/CourseViewPage/CourseViewPage";
import ListOfStudents from "./Components/Admin/ListOfStudents/ListOfStudents";
import ListOfTeachers from "./Components/Admin/ListOfTeachers/ListOfTeachers";
import{Questionnaire} from './Components/Questionnaire/Questionnaire';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/MoreDetails" element={<MoreDetails />} />
          <Route path="/About/LearnMore" element={<LearnMore />} />
          <Route path="/Admin" element={<AdminLogin />} />
          <Route path="/Admin/Home" element={<AdminHomePage />} />
          <Route path="/Admin/ForgotPassword" element={<AdminForgotPass />} />
          <Route path="/loginsignup" element={<LoginSignup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:id/:token" element={<ResetPassword />} />
          <Route path="/teachersignup" element={<TeacherSignup />} />
          <Route path="/studentsignup" element={<StudentSignup />} />
          <Route path="/teacherhomepage" element={<TeacherHomePage />} />
          <Route path="/studenthomepage" element={<StudentHomePage />} />
          <Route path="/profilepage" element={<ProfilePage />} />
          <Route path="/trial" element={<Trial />} />
          <Route path="/teacherprofile" element={<TeacherProfile />} />
          <Route path="/teacheraddcourse" element={<TeacherAddCourse />} />
          <Route path="/teacherviewcourse" element={<TeacherViewCourse />} />
          <Route path="/studentviewcourse" element={<StudentViewCourse />} />
          <Route path="/allcourselist" element={<StudentAddCourse />} />
          <Route path="/courseviewpage" element={<CourseViewPage />} />
          <Route path="/Admin/ListOfStudents" element={<ListOfStudents />} />
          <Route path="/Admin/ListOfTeachers" element={<ListOfTeachers />} />
          <Route path = '/questionnaire' element = {<Questionnaire/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
