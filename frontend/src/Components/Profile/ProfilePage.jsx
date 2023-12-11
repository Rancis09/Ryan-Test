import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserDataAtom } from "../../hooks/user_data_atom";

export const ProfilePage = () => {
  const navigate = useNavigate();
  // State to track whether the form is in edit mode
  const [editMode, setEditMode] = useState(false);
  // State to store form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showDropdown, setShowDropdown] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userData, setUserData] = useUserDataAtom();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [userImage, setUserImage] = useState("");

  const handleImageChange = (event) => {
    if (!editMode) {
      console.log("Edit mode is not enabled. Cannot change image.");
      return;
    }
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    try {
      if (!editMode) {
        console.log("Edit mode is not enabled. Cannot upload image.");
        return;
      }
      const formData = new FormData();
      formData.append("avatar", selectedImage); // Ensure 'avatar' matches the field name expected by the server

      console.log(selectedImage);
      console.log(_id);
      const response = await axios.put(
        `http://localhost:3002/studentAvatar?userId=${_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle response or update UI after successful image upload
      console.log("Image uploaded:", response.data);
    } catch (error) {
      // Handle error cases
      console.error("Error uploading image:", error);
    }
  };

  const handleAvatarClick = () => {
    const avatarInput = document.getElementById("avatarInput");
    if (avatarInput) {
      avatarInput.click();
    } else {
      console.error("Avatar input element not found.");
    }
  };

  const {
    birthDate = "",
    email = "",
    firstName = "",
    lastName = "",
    _id = "",
  } = userData || {};

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const toggleEditMode = () => {
    if (editMode) {
      // If currently in edit mode, reset form data to initial state on cancel
      // setFormData({
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
    setEditMode(!editMode);
  };

  const [studentUser, setStudentUser] = useState({});

  //jwt
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    axios
      .get(`http://localhost:3002/studentprofile?userId=${_id}`)
      .then((result) => {
        setStudentUser(result.data);
        console.log(result);
        console.log("Result: " + result.data);
        console.log("Data: " + userData.avatar);
        setUserImage(userData.avatar);
        if (result.data !== "Success") {
          navigate("/loginsignup");
        }
      })

      .catch((err) => console.log(err));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Send updated data to the server
    axios
      .put(`http://localhost:3002/updatestudentprofile?userId=${_id}`, formData)
      .then((response) => {
        // Assuming your server sends back the updated user data
        setUserData(response.data);
        localStorage.setItem("userData", JSON.stringify(response.data));
        // Disable edit mode after successful update
        setEditMode(false);
        setSuccessMessage("Profile details updated successfully"); // Set success message
        setTimeout(() => setSuccessMessage(""), 3000);
        console.log(userData);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };
  const updatePassword = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    } else {
      axios
        .post(`http://localhost:3002/profileresetpassword/${_id}`, { password })
        .then((res) => {
          if (res.data.Status === "Success") {
            setSuccessMessage(
              "Password changed successfully! Redirecting to login..."
            );
            setErrorMessage("");
            setTimeout(() => {
              navigate("/loginsignup");
            }, 2000);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="profilepage">
      <form onSubmit={handleFormSubmit}>
        <div className="row-1">
          <div className="prof-container">
            <div className="user-avatar" onClick={handleAvatarClick}>
              <img
                src={
                  "http://localhost:3002/uploaded-image/" + userImage ||
                  "./default_profile.webp"
                }
                alt="User Avatar"
              />
              {/* Conditionally render the upload button based on edit mode */}
              {editMode && (
                <>
                  <input
                    type="file"
                    id="avatarInput"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                  <button onClick={handleImageUpload}>Upload Image</button>
                </>
              )}
            </div>
            <div className="user-about">
              <h1> About </h1>
            </div>
            <div className="about1">
              <div className=""></div>
            </div>
          </div>
          <div className="info-container">
            <div className="label0">
              <p> Personal Information</p>
            </div>

            <div className="col-1">
              <p>First Name</p>
              <p>Last Name</p>
            </div>

            <div className="col-2">
              <input
                type="name"
                id="firstName"
                placeholder="Enter first name"
                value={editMode ? formData.firstName : firstName}
                onChange={handleInputChange}
                disabled={!editMode}
              >
                {/* // Disable input if not in edit mode */}
              </input>
              <input
                type="name"
                id="lastName"
                placeholder="Enter last name"
                value={editMode ? formData.lastName : lastName}
                onChange={handleInputChange}
                disabled={!editMode}
              >
                {/* // Disable input if not in edit mode */}
              </input>
            </div>
            <div className="col-3">
              <p>Email</p>
            </div>
            <div className="col-4">
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                value={editMode ? formData.email : email}
                onChange={handleInputChange}
                disabled={!editMode}
              >
                {/* // Disable input if not in edit mode */}
              </input>
            </div>

            <div>
              <button
                className="dropdown-toggle"
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {showDropdown ? "Hide" : "Change Password"}
              </button>
              {showDropdown && (
                <div>
                  <div className="col-5">
                    <p>Password</p>
                    <p>Confirm Password</p>
                  </div>
                  <div className="col-6">
                    <input
                      type="password"
                      id="password"
                      placeholder="Enter password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={!editMode}
                    />
                    <input
                      type="password"
                      id="confirmPassword"
                      placeholder="Enter confirm password"
                      required
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={!editMode}
                    />
                  </div>
                  <div className="butRes">
                    <button
                      type="button"
                      onClick={updatePassword}
                      disabled={!editMode}
                    >
                      {" "}
                      Update Password
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="col-7">
              <div className="but1">
                <button
                  type="button"
                  onClick={() => navigate("/studenthomepage")}
                >
                  {" "}
                  Back
                </button>
              </div>
              <div className="but2">
                <button type="button" id="edit" onClick={toggleEditMode}>
                  {editMode ? "Cancel" : "Edit"}
                </button>
              </div>
              <div className="but3">
                {editMode ? <button type="submit" id="update" disabled={!editMode}>
                  {" "}
                  Update
                </button> : null}
              </div>
              <div className="success-message" style={{ color: "green" }}>
                {successMessage}
              </div>
              <div className="error-message" style={{ color: "red" }}>
                {errorMessage}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
