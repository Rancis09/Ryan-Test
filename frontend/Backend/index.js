const express = require("express")
const mongoose = require('mongoose')
const multer = require('multer');
const cors = require("cors")
const path = require('path')
const user_StudentModel = require('./models/user_Student')
const user_TeacherModel = require('./models/user_Teacher')
const teacher_AddCourseModel = require ('./models/teacher_Addcourse')
const student_AddCourseModel = require ('./models/student_Addcourse')
const teacher_AddTopicModel = require('./models/teacher_Addtopic')
const teacher_AddQuizModel = require('./models/teacher_AddQuiz')
const user_AdminModel = require('./models/user_admin')
//jwt
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
var nodemailer = require("nodemailer");

require("dotenv/config");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://cour-cert.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/uploaded-files", express.static("uploaded-files"));
app.use("/uploaded-image", express.static("uploaded-image"));

//jwt
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("The token was not available");
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) return res.json("Token is wrong");
      next();
    });
  }
};

app.get("/studenthomepage", verifyUser, (req, res) => {
  return res.json("Success");
});
app.get("/studentprofile", verifyUser, (req, res) => {
  return res.json("Success");
});
app.get("/studentviewcourse", verifyUser, (req, res) => {
  return res.json("Success");
});
// app.get('/getStudentcourses', verifyUser, (req, res) => {
//     return res.json("Success")
//   });
app.get("/teacherhomepage", verifyUser, (req, res) => {
  return res.json("Success");
});
app.get("/teacherprofile", verifyUser, (req, res) => {
  return res.json("Success");
});

app.get("/teacheraddcourse", verifyUser, (req, res) => {
  return res.json("Success");
});

app.post("/signout", (req, res) => {
  res.clearCookie("token").json({ message: "Signout successful" });
});

//jwt

//Student Login
app.post("/loginsignupstudent", (req, res) => {
  const { email, password } = req.body;

  user_StudentModel.findOne({ email: email }).then((userStudent) => {
    if (userStudent) {
      bcrypt.compare(password, userStudent.password, (err, response) => {
        if (response) {
          const token = jwt.sign(
            { email: userStudent.email },
            "jwt-secret-key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          // res.json("Success")

          res.json({
            status: "Success",
            userStudent,
          });
        } else {
          res.json("Password is incorrect");
        } //
      });
    } else {
      res.json("No record existed");
    }
  });
});

//Teacher login
app.get("/loginsignupteacher", (req, res) => {
  const { email, password } = req.query;

  user_TeacherModel.findOne({ email: email }).then((userTeacher) => {
    if (userTeacher) {
      bcrypt.compare(password, userTeacher.password, (err, response) => {
        if (response) {
          console.log * ("response: " + response);
          const token = jwt.sign(
            { email: userTeacher.email },
            "jwt-secret-key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);

          res.json({
            status: "Success",
            userTeacher,
          });
        } else {
          //optional getuyo ra para d ka proceed if i input ang hash password
          res.json("Password is incorrect");
        } //
      });
    } else {
      res.json("No record existed");
    }
  });
});

//student signup credentials into database
app.post("/studentsignup", async (req, res) => {
  try {
    const { firstName, lastName, email, password, birthDate, gender } =
      req.body;

    // Check if the email already exists in the database
    const existingUser = await user_StudentModel.findOne({ email: email });

    if (existingUser) {
      res.json("Email already in use.");
    } else {
      // Hash the password
      bcrypt
        .hash(password, 10)
        .then(async (hash) => {
          // Create a new user with the hashed password
          const newUser = await user_StudentModel.create({
            firstName,
            lastName,
            email,
            password: hash,
            birthDate,
            gender,
          });

          res.json(newUser);
        })
        .catch((err) => console.log(err.message));
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//teacher signup credentials are added into the database
app.post("/teachersignup", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      birthDate,
      gender,
      credentialsLink,
    } = req.body;

    // Check if the email already exists in the database
    const existingUser = await user_TeacherModel.findOne({ email: email });

    if (existingUser) {
      res.json("Email already in use.");
    } else {
      // Hash the password
      bcrypt
        .hash(password, 10)
        .then(async (hash) => {
          // Create a new user with the hashed password
          const newUser = await user_TeacherModel.create({
            firstName,
            lastName,
            email,
            password: hash,
            birthDate,
            gender,
            credentialsLink,
          });

          res.json(newUser);
        })
        .catch((err) => console.log(err.message));
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/getStudentcourses", (req, res) => {
  teacher_AddCourseModel
    .find()
    .then((courses) => res.json(courses))
    .catch((err) => res.json(err));
});

app.get("/getEnrolledcourses", (req, res) => {
  const { id } = req.query;
  console.log("student id: " + id);
  if (!id) {
    return res
      .status(400)
      .json({ error: "Missing user_id in the request body" });
  }
  student_AddCourseModel
    .find({ user_id: id })
    .then((courses) => res.json(courses))
    .catch((err) => res.json(err));
});

app.get("/getTeachercourses", (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res
      .status(400)
      .json({ error: "Missing user_id in the request body" });
  }

  teacher_AddCourseModel
    .find({ user_id: id })
    .then((courses) => res.json(courses))
    .catch((err) => res.json(err));
});

// Add new teacher course
app.post("/teacher_AddCourse", async (req, res) => {
  const { course_title, course_description, user_id } = req.body;

  try {
    const existingCourseTitle = await teacher_AddCourseModel.findOne({
      course_title: course_title,
    });

    if (existingCourseTitle) {
      res.json("Course already exists");
    } else {
      const newCourse = await teacher_AddCourseModel.create({
        course_title,
        course_description,
        user_id,
      });

      res.json(newCourse);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.post('/quiz/add/:courseID', async (req, res) => {
    const { courseID } = req.params;
    const { questions } = req.body;
  
    try {
      // Do something with courseID and questions, e.g., save it to the database
      const newQuiz = new teacher_AddQuizModel({ courseID, questions });
      const savedQuiz = await newQuiz.save();
  
      res.json(savedQuiz);
    } catch (error) {
      console.error('Error adding quiz:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
// New endpoint for fetching quizzes
app.get('/quiz', async (req, res) => {
  try {

    // Fetch all quizzes from the database
    const quizzes = await teacher_AddQuizModel.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//add student course
app.post("/student_AddCourse", async (req, res) => {
  const { userId, courseId, course_title, course_description } = req.body;
  console.log("wdwsds: " + courseId);

  try {
    const existingCourseID = await student_AddCourseModel.findOne({
      course_id: courseId,
      user_id: userId,
    });

    if (existingCourseID) {
      res.json(error);
    } else {
      const newCourse = await student_AddCourseModel.create({
        user_id: userId,
        course_id: courseId,
        course_title: course_title,
        course_description: course_description,
      });
      console.log("Sucess!!");
      res.json(newCourse);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploaded-files"); // Define the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/AddFiles", upload.single("file"), async (req, res) => {
  try {
    const data = req.body;
    const { id } = data;
    console.log(data);
    console.log(req.file);

    const { weekNumber, PDFdescription } = data;
    const fileName = req.file.filename;

    console.log("week " + weekNumber);
    console.log("week " + PDFdescription);
    const existingCourse = await teacher_AddCourseModel.findById(id);

    if (!existingCourse) {
      return res.status(404).json("Course not found");
    }

    const Addtopic = await teacher_AddTopicModel.create({
      weekNumber: weekNumber,
      PDFdescription: PDFdescription,
      file: fileName,
      course_id: id,
    });

    console.log("data from Addtopic" + Addtopic);

    if (Addtopic) {
      res.json(Addtopic);
    } else {
      res.status(404).json("Course not found");
    }
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/getWeeklyTopics", (req, res) => {
  try {
    const { id } = req.query;
    console.log("id: " + id);
    if (!id) {
      return res
        .status(400)
        .json({ error: "Missing user_id in the request body" });
    }
    teacher_AddTopicModel
      .find({ course_id: id })
      .then((weeklytopics) => res.json(weeklytopics), console.log("success!!"))
      .catch((err) => res.json(err));
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

// Update teacher course's topic and description
app.put("/updateCourse", async (req, res) => {
  const data = req.body;
  const { id } = data;
  console.log(data);

  const { course_title, course_description } = data;
  console.log("Course id: " + id);
  console.log("coursetitle: " + course_title);
  console.log("coursedescription: " + course_description);

  try {
    const existingCourse = await teacher_AddCourseModel.findById(id);

    if (!existingCourse) {
      return res.status(404).json("Course not found");
    }

    const updatedCourse = {
      course_title: course_title,
      course_description: course_description,
    };

    console.log("updatedCourse:", updatedCourse);

    const updatedCourseResult = await teacher_AddCourseModel.findByIdAndUpdate(
      id,
      updatedCourse,
      { new: true }
    );

    if (updatedCourseResult) {
      res.json(updatedCourseResult);
    } else {
      res.status(404).json("Course not found");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//For student profile
app.get("/studentprofile", (req, res) => {
  const { userId } = req.query; // Use req.query to get query parameters
  user_StudentModel
    .findById(userId) // Use findOne instead of find to get a single user
    .then((studentUser) => res.json(studentUser))
    .catch((err) => res.json(err));
});

//for teaacher profile
app.get("/teacherprofile", (req, res) => {
  const { userId } = req.query; // Use req.query to get query parameters
  user_TeacherModel
    .findById(userId) // Use findOne instead of find to get a single user
    .then((teacherUser) => res.json(teacherUser))
    .catch((err) => res.json(err));
});

//storage for profile pictures
const storages = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploaded-image"); // Define the upload directory
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const uploads = multer({ storage: storages });

app.put("/studentAvatar", uploads.single("avatar"), async (req, res) => {
  const { userId } = req.query;
  console.log(req.file);
  console.log(userId);

  try {
    const user = await user_StudentModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const avatarProfile = {
      avatar: req.file.filename,
    };

    const updatedProfile = await user_StudentModel.findByIdAndUpdate(
      userId,
      avatarProfile,
      { new: true }
    );

    if (updatedProfile) {
      res.json(updatedProfile);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/teacherAvatar", uploads.single("avatar"), async (req, res) => {
  const { userId } = req.query;
  console.log(req.file);
  console.log(userId);

  try {
    const user = await user_TeacherModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const avatarProfile = {
      avatar: req.file.filename,
    };

    const updatedProfile = await user_TeacherModel.findByIdAndUpdate(
      userId,
      avatarProfile,
      { new: true }
    );

    if (updatedProfile) {
      res.json(updatedProfile);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//for student update profile details
app.put("/updatestudentprofile", verifyUser, async (req, res) => {
  const data = req.body;

  // Extract relevant fields from the formData object
  const { firstName, lastName, email } = data;
  const { userId } = req.query;

  try {
    // Find the user by userId
    const user = await user_StudentModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user fields if provided in the request
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;

    // Save the updated user
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//for teacher update profile details
app.put("/updateteacherprofile", verifyUser, async (req, res) => {
  const data = req.body;

  // Extract relevant fields from the formData object
  const { firstName, lastName, email } = data;
  const { userId } = req.query;

  try {
    // Find the user by userId
    const user = await user_TeacherModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user fields if provided in the request
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;

    // Save the updated user
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//for search course --searchbar in student
app.get("/searchcourse", async (req, res) => {
  try {
    const { query } = req.query;

    // Use a regular expression to perform a case-insensitive search
    const courses = await teacher_AddCourseModel.find({
      course_title: { $regex: new RegExp(query, "i") },
    });

    res.json(courses);
  } catch (error) {
    console.error("Error searching courses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//nodemailer
app.post("/forgotpassword", (req, res) => {
  const { email } = req.body;

  // Check both student and teacher models
  Promise.all([
    user_StudentModel.findOne({ email }),
    user_TeacherModel.findOne({ email }),
  ])
    .then(([user_Student, user_Teacher]) => {
      // Check if either a student or a teacher with the given email exists
      if (user_Student || user_Teacher) {
        const user = user_Student || user_Teacher; // Use the first non-null user

        const token = jwt.sign({ id: user._id }, "jwt_secret_key", {
          expiresIn: "1d",
        });

        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "courcertdeveloper@gmail.com",
            pass: "lstu ntsg pqzb lwwt",
          },
        });

        var mailOptions = {
          from: "youremail@gmail.com",
          to: email,
          subject: "Reset Your Cour-Cert Account Password",
          text: `Dear Cour-Cert User,
                
                Here are your Cour-Cert Account Reset Password Link.
                The Reset Password link will expire in 24 hours.

                http://localhost:3000/resetpassword/${user._id}/${token}

                
                The Cour-Cert Developer Team`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            return res.send({ Status: "Error sending email" });
          } else {
            return res.send({ Status: "Success" });
          }
        });
      } else {
        return res.send({ Status: "User doesn't exist." });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.send({ Status: "Error" });
    });
});

app.post("/resetpassword/:id/:token", (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  jwt.verify(token, "jwt_secret_key", (err, decoded) => {
    if (err) {
      return res.json({ Status: "Error with token" });
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          // Check both student and teacher models
          Promise.all([
            user_StudentModel.findByIdAndUpdate(
              { _id: id },
              { password: hash }
            ),
            user_TeacherModel.findByIdAndUpdate(
              { _id: id },
              { password: hash }
            ),
          ])
            .then(([studentUpdate, teacherUpdate]) => {
              // Check if either a student or a teacher with the given ID exists
              if (studentUpdate || teacherUpdate) {
                return res.send({ Status: "Success" });
              } else {
                return res.send({ Status: "User doesn't exist." });
              }
            })
            .catch((err) => res.send({ Status: err }));
        })
        .catch((err) => res.send({ Status: err }));
    }
  });
});
app.post("/profileresetpassword/:id", (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      // Check both student and teacher models
      Promise.all([
        user_StudentModel.findByIdAndUpdate({ _id: id }, { password: hash }),
        user_TeacherModel.findByIdAndUpdate({ _id: id }, { password: hash }),
      ])
        .then(([studentUpdate, teacherUpdate]) => {
          // Check if either a student or a teacher with the given ID exists
          if (studentUpdate || teacherUpdate) {
            return res.send({ Status: "Success" });
          } else {
            return res.send({ Status: "User doesn't exist." });
          }
        })
        .catch((err) => res.status(500).send({ Status: err.message }));
    })
    .catch((err) => res.status(500).send({ Status: err.message }));
});

app.get("/Admin", cors(), (req, res) => {});

app.post("/Admin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await user_AdminModel.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      res.json("not exist");
    }
  } catch (e) {
    res.json("fail");
  }
});

mongoose
  .connect(process.env.DB_URI, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3002, () => {
  console.log("server is running");
});

// ADMIN SIDE

app.get("/getStudentUsers", (req, res) => {
  user_StudentModel
    .find() // Remove the filter condition
    .then((students) => res.json(students))
    .catch((err) => res.json(err));
});

app.get("/getTeachersUsers", (req, res) => {
  user_TeacherModel
    .find() // Remove the filter condition
    .then((teachers) => res.json(teachers))
    .catch((err) => res.json(err));
});

//Delete Student User
app.delete("/deleteStudentUser/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await user_StudentModel.findByIdAndRemove(userId);

    if (deletedUser) {
      res.json({
        status: "Success",
        message: "Student user deleted successfully",
      });
    } else {
      res
        .status(404)
        .json({ status: "Error", message: "Student user not found" });
    }
  } catch (error) {
    res.status(500).json({ status: "Error", error: error.message });
  }
});

//Delete Teacher User
app.delete("/deleteTeacherUser/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await user_TeacherModel.findByIdAndRemove(userId);

    if (deletedUser) {
      // Find and delete associated courses
      const deletedCourses = await teacher_AddCourseModel.deleteMany({
        user_id: userId,
      });

      // Check if courses were deleted
      if (deletedCourses.deletedCount > 0) {
        // Delete topics associated with the deleted courses
        await teacher_AddTopicModel.deleteMany({
          course_id: { $in: deletedCourses.deletedIds },
        });

        res.json({
          status: "Success",
          message:
            "Teacher user, associated courses, and topics deleted successfully",
        });
      } else {
        res.status(404).json({
          status: "Error",
          message: "No courses found for the teacher user",
        });
      }
    } else {
      res.status(404).json({
        status: "Error",
        message: "Teacher user not found",
      });
    }
  } catch (error) {
    res.status(500).json({ status: "Error", error: error.message });
  }
});
