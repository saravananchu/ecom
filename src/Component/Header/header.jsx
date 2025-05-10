import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './header.css';
import { useState, useEffect } from "react";

function Header() {
    const [username, setUsername] = useState(null);
    const [image, setImage] = useState(null);
    const [userCount, setUserCount] = useState(0);  // State to store the count
    const navigate = useNavigate();

    // Get login username and user profile image
    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUsername = localStorage.getItem("username"); // Retrieve username
        const images = localStorage.getItem('image');

        if (!token) {
            navigate("/"); // Redirect to login if no token exists
        } else {
            setUsername(storedUsername); // Set the username from localStorage
            setImage(images);
        }
    }, [navigate]);

    // Fetch the count of users from the backend (only if username is available)
    useEffect(() => {
        if (username) {
            axios.get(`http://localhost:3001/count/${username}`)
                .then(result => setUserCount(result.data.count))  // Set the count from response
                .catch(err => console.log('Error:', err));  // Log error if any
        }
    }, [username]); // Only run this effect when the username is available

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.replace('/'); // Redirect to login page (and remove the current page from history)
    };

    return (
        <>
            <div className="main">
                <div className="container headers">
                    <div className="left">
                        <Link to={'/'}>
                            <img className="logo" src="http://magento2.magentech.com/themes/sm_teco/pub/static/frontend/Sm/teco/en_US/images/logo.svg" alt="Logo" />
                        </Link>
                    </div>
                    <div className="right">
                        <a href="#">Home</a>
                        <a href="#">Feature</a>
                        <a href="#">Blog</a>
                        <a href="#">About us</a>
                        <a href="#">Contact us</a>
                    </div>
                    <div className="prosd">
                        {username && (
                            <>
                                <img src={`http://localhost:3001/Images/${image}`} alt="User Profile" className="profs mx-2" />
                                <p>{username}</p>
                            </>
                        )}
                    </div>

                    <div className="btn-group" role="group" aria-label="Basic example">
                        <Link to={`/addcart/${username}`}>
                            <button className="btn ca">
                                Cart <span className="badge bg-danger rounded-pills">{userCount > 0 ? userCount : ''}</span>
                            </button>
                        </Link>

                        {!username ? (
                            <a href='/login'>
                                <button className="btn lo">Login</button>
                            </a>
                        ) : (
                            <button className="btn lo" onClick={handleLogout}>Log Out</button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
