import { useState } from "react";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate(); // Hook to navigate between pages
 // To store any error messages

  const submit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    
    try {
      // Make the POST request to the backend
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password,
      });
  
      // If login is successful, store the token and username in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username); // Save username
      localStorage.setItem('image', response.data.image); 
      // Redirect to the homepage or dashboard
      navigate('/'); // Use navigate instead of history.push
    } catch (error) {
      // Log the full error for debugging
      console.error('Login failed:', error);
  
      // Handle different error types
     
    } 
  };
  

  return (
    <>
      


      <div className="container mt-5 lo">
        <div className="card card-lo">
            <h2>Login</h2>
            <form onSubmit={submit}>
                <div className="input-container">
                    <label for="username">Username:</label>
                    <input type="email" id="username" name="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className="input-container">
                    <label for="password">Password:</label>
                     <input
          type="password"
          placeholder="Password"
          value={password}  id="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
                </div>

                <button type="submit" className="btn">Login</button>

                <div className="footers">
                    <p>Don't have an account? <a href="/reg">Sign up</a></p>
                </div>
            </form>
        </div>
    </div>
    </>
  );
}

export default Login;
