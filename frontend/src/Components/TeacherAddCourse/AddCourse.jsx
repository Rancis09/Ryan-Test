import React, { useEffect,useState } from 'react';
import './AddCourse.css';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useUserDataAtom } from '../../hooks/user_data_atom';
import { Textarea } from 'theme-ui';
import axios from 'axios';

export const TeacherAddCourse = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTitle = queryParams.get('title');
  const initialDescription = queryParams.get('description');
  const [courseTitle, setCourseTitle] = useState(initialTitle);
  const [courseDescription, setCourseDescription] = useState(initialDescription);
  const id = queryParams.get('id');
  const [userData, setUserData] = useUserDataAtom();
  const [week, setWeek] = useState('');
  const [pdfTitle, setPdfTitle] = useState('');
  const [pdfFile, setPdfFile] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([{ questionText: '', choices: ['', '', ''], correctAnswer: '' }]);

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', choices: ['', '', ''], correctAnswer: '' }]);
  };

  const handleQuestionChange = (index, key, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][key] = value;
    setQuestions(updatedQuestions);
  };

  const handleChoiceChange = (questionIndex, choiceIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].choices[choiceIndex] = value;
    setQuestions(updatedQuestions);
  };
// AddCourse.jsx
const handleAddQuiz = async () => {
  try {
    console.log({ courseID: id, questions });
    const response = await axios.post(`http://localhost:3002/quiz/add/${id}`, { courseID: id, questions });
    console.log('Quiz added:', response.data);
  } catch (error) {
    console.error('Error adding quiz:', error);
  }
};

  
  console.log("data ID from view course: " + id);

    //jwt
    axios.defaults.withCredentials = true;
    useEffect(() => {
      axios
        .get("http://localhost:3002/teacheraddcourse")
        .then((result) => {
          console.log(result);
          
        console.log("Token: " +result.data);
          if (result.data !== "Success") {
            navigate("/loginsignup");
          }
        })
        .catch((err) => console.log(err));
    }, []);
  //

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!pdfFile) {
      // If pdfFile is empty, show an error message
      alert("Please upload a file");
      return;
    }
  
    const WeeklyData = {
      id,
      weekNumber: week,
      file: pdfFile,
      PDFdescription: pdfTitle,
    };
  
    try {
      const weeklytopic = await axios.post("http://localhost:3002/AddFiles", WeeklyData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(weeklytopic);
      setUploadSuccess(true);
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error if needed
    }
  };
  

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    const courseData = {
      id,
      course_title: courseTitle,
      course_title: courseTitle,
      course_description: courseDescription,
    };

    console.log(courseTitle, courseDescription,id);
    const data = await axios.put("http://localhost:3002/updateCourse", courseData);
    console.log(data);
  };

  return (
    <div className="addcoursecontainer">
      <nav className='first-nav'>
        <div className="first-nav-logo">
          <img src="Logo1.1.png" alt="Cour-Cert"></img>
        </div>
        <div className='first-nav-title'>
          <p className='p1'> Course-Certification</p>
          <div className='first-nav-title1'>
            <p className='p2'> "Empowering Your Learning Journey"</p>
          </div>
        </div>
      </nav>
      <nav className='second-nav'>
        <div className="second-nav-links">
          <ul>
            <li><Link to="/teacherviewcourse"> View Course</Link > </li>
            <li><Link to="/teacherprofile"> Account Profile</Link > </li>
            <li><Link to="/teacherviewcourse"> Back</Link > </li>
          </ul>
        </div>
      </nav>
      <form encType="multipart/form-data">
        <div className="details">
        <div className="addcourse-label_dets">
        <p>Course Title:</p>  
        </div>
          <div className="title">
          <Textarea
              type="text"
              id="title"
              placeholder="Your Title"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
            />
          </div>
          <div className="addcourse-label_dets">
        <p>Course Description:</p>  
        </div>
          <div className="description">
            <Textarea
              placeholder="Course Description"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="addcourse-label">
        <p>Add Topic:</p>  
        </div>
        <div className="addcourse-row">
          <div className="addcourse-col">
            <div className="Forms">
              <input
                className="form-input1"
                type="text"
                id="topicnumber"
                placeholder="Topic"
                value={week}
                onChange={(e) => setWeek(e.target.value)}
              />
              <input
                type="text"
                className="PdfFilename"
                placeholder="Title of the file"
                value={pdfTitle}
                onChange={(e) => setPdfTitle(e.target.value)}
              />
              <div className="inputfile">
  <label>
    Choose a file
    <input
      type="file"
      name="pdfFile"
      accept=".pdf"
      onChange={(e) => setPdfFile(e.target.files[0])}
    />
  </label>
  <span className="filename">{pdfFile && pdfFile.name}</span>
</div>
            </div>
            
<button className="ACupload-button" type="submit" onClick={handleSubmit}>
  Upload File
</button>

            {uploadSuccess}
            
          
        
        {uploadSuccess && (
          <div className="ACsuccess-message">
            File upload successful!
          </div>
        )}
        </div></div>
        <div className="addcourse-label">
        <p>Create Quiz:</p>  
        </div>
        <div className="createQuizMargin">
        <div className="createQuizContainer">

              {/* Render quiz questions here */}
        {questions.map((question, questionIndex) => (
          <div key={questionIndex} className="quiz-container">
            <input
              type="text"
              placeholder={`Question ${questionIndex + 1}`}
              value={question.questionText}
              onChange={(e) =>
                handleQuestionChange(questionIndex, 'questionText', e.target.value)
              }
            />

            {/* Add inputs for choices */}
            {question.choices.map((choice, choiceIndex) => (
              <input
                key={choiceIndex}
                type="text"
                placeholder={`Choice ${choiceIndex + 1}`}
                value={choice}
                onChange={(e) =>
                  handleChoiceChange(questionIndex, choiceIndex, e.target.value)
                }
              />
            ))}

            {/* Input for correct answer */}
            <input
              type="text"
              placeholder="Correct Answer"
              value={question.correctAnswer}
              onChange={(e) =>
                handleQuestionChange(questionIndex, 'correctAnswer', e.target.value)
              }
            />
          </div>
        ))}
        <div className='QuizButtonsContainer'>
        {/* Button to add more questions */}
          <button type="button" onClick={addQuestion}>
            Add Question
          </button>
          
          {/* Button to submit the quiz */}
          <button type="button" onClick={handleAddQuiz}>
            Add Quiz
          </button>
          </div>

        </div></div>
        <div className="butts">
          <button type="submit" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
        
      </form>
    </div>
  );
};
