import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './register.css'

function Reg() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image,setImage] =useState();
  const [message, setMessage] = useState(""); // To store success or error message



  const navigate=useNavigate()
  const formdata=new FormData()
  
  // Register user function
  const registerUser = async (formdata) => {
    try {
      const response = await axios.post('http://localhost:3001/reg',formdata,{
          headers: {
              "Content-Type": "multipart/form-data", // Ensure correct content type
            },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Submit form
  const submit = async (e) => {
    e.preventDefault();

    setMessage(""); // Reset any previous messages
    formdata.append('username',username)
    formdata.append('email',email)
    formdata.append('password',password)
    if (image) {
      formdata.append('image', image);
    }

    try {
      const res = await registerUser(formdata);
      setMessage("Registration successful!"); // Set success message
      console.log('Success:', res);
      navigate('/login')

    } catch (error) {
      setMessage("Error registering user. Please try again."); // Set error message
      console.log('Error:', error);
    }
  };

  return (
    <>
      <div className="container mt-5 lo re">
        <div className="card card-lo">
            <h2>Register</h2>
            <form onSubmit={submit}>
                <div className="input-container">
                    <label for="username">Username:</label>
                    <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />  </div>

                <div className="input-container">
                    <label for="password">Email:</label>
                    <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
                </div>
                <div className="input-container">
                    <label for="password">Password:</label>
                    <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
                </div>
                <div className="input-container">
                    <label for="password">Image:</label>
              
        <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                </div>

                <button type="submit" className="btn">Register</button>

                <div className="footers">
                    <p>Already you have an account?<br/> <a href="/login">Sign in</a></p>
                </div>
            </form>
        </div>
    </div>
    </>
  );
}

export default Reg;
