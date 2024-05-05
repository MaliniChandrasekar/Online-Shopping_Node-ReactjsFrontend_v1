import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import loginbg from '../loginbg.jpg';


const Login = () => {
  const { price } = useParams();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please enter both email and password");
      return;
    }

    axios
      .get(`http://localhost:8080/user/checkEmail/${formData.email}`)
      .then((res) => {
        if (res.data && res.data.exists) {
          loginUser(); // If email exists, proceed with login
        } else {
          alert("User not registered. Please sign up first.");
          navigate(`/signup/789`)
        }
      })
      .catch((error) => {
        console.error("Error checking user registration:", error);
        alert("Error occurred. Please try again later.");
      });
  };

  const loginUser = () => {
    axios
      .post("http://localhost:8080/user/login", formData)
      .then((res) => {
        if (res.data && res.data.user) {
          alert("Login successful");
          setIsLoggedIn(true);
          const token = res.data.token;
          localStorage.setItem("token", token);
          const user = res.data.user;
          const userId = res.data.user._id;
          sessionStorage.setItem("userId", userId);
          if (user.role === "Admin") {
            navigate(`/admin/${user.firstname}`);
          } else {
            console.log(price);
            navigate(`/`);
          }
        } else {
          alert("Incorrect email or password");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("Error occurred. Please try again later.");
      });
  };

  const bg = {
    backgroundImage: `linear-gradient(rgba(248, 247, 247, 0.3),rgba(248, 247, 247, 0.7)), url(${loginbg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }

  const content = {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '10px 10px 10px black',
    width: '350px',
    height: '300px'
  };

  const m1 = {
    fontWeight: 'bold',
    color: '#1F456E',
    fontFamily: 'Montserrat, sans-serif',
  }

  return (
    <div style={bg}>
      <div className=' p-2 m-2 m1 d-flex align-items-center justify-content-center' style={{ height: '620px' }}>
        <div className=' m-2 text-center' style={content}>
          <div><svg xmlns="http://www.w3.org/2000/svg" style={{ color: '#0077B6' }} width="50" height="50" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
          </svg></div><br></br>
          <p style={m1}>Email : <input type='email' placeholder='enter your email-id' name='email' value={formData.email} onChange={handleChange} /></p>
          <p style={m1}>Password: <input type='password' placeholder='enter your password' name='password' value={formData.password} onChange={handleChange} /></p>
          <p style={m1}>Don't you have an account? : <Link to={`/signup/${price}`}>SignUp</Link></p>
          <button onClick={handleSubmit}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Login;
