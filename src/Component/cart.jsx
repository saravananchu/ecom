import axios from "axios";
import { useEffect, useState } from "react";
import './cart.css';
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header/header";
import Footer from "./Footer/footer";

function Addcart() {
    const [username, setUsername] = useState(null);
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({}); // Track quantities of items
    const navigate = useNavigate();

    // Get username and check token from localStorage
    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUsername = localStorage.getItem("username"); // Retrieve username

        if (!token) {
            navigate("/login"); // Redirect to login if no token exists
        } else {
            setUsername(storedUsername); // Set the username from localStorage
        }
    }, [navigate]);

    // Load products for the user
    useEffect(() => {
        if (username) {
            axios.get(`http://localhost:3001/addcart/${username}`)  // Corrected URL path
            // Pass username as a query param
                .then((result) => {
                    setProducts(result.data);
                    // Initialize quantities from fetched data
                    const initialQuantities = result.data.reduce((acc, product) => {
                        acc[product._id] = 1; // Default quantity to 1
                        return acc;
                    }, {});
                    setQuantities(initialQuantities);
                })
                .catch((err) => {
                    console.error("Error loading product details:", err);
                });
        }
    }, [username]); // Only run when the username changes

    // Handle item removal
    const handleRemove = (id) => {
        axios.delete(`http://localhost:3001/deletUser/${id}`)
            .then(res => {
                console.log(res);
                setProducts(products.filter(product => product._id !== id)); // Remove the product from state
                window.location.reload()
            })
            .catch(err => console.log('Error removing item:', err));
    };

    // Handle quantity change
    const handleQuantityChange = (e, id) => {
        const updatedQuantities = { ...quantities, [id]: e.target.value };
        setQuantities(updatedQuantities);
    };

    // Calculate subtotal for each product
    const calculateSubtotal = (product) => {
        return (quantities[product._id] || 1) * product.price;
    };

    return (
        <>
            <Header />
            <div className="container mb-5">
                <table className="table mx-auto text-center">
                    <tbody>
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                            <th>Remove item</th>
                        </tr>
                        {
                            products.map((product) => (
                                <tr key={product._id}>
                                    <td>
                                        <img src={`http://localhost:3001/Images/${product.image}`} className="iam" alt={product.name} />
                                    </td>
                                    <td className="a">${product.price}</td>
                                    <td className="a">
                                        <input
                                            type="number"
                                            value={quantities[product._id] || 1}
                                            min="1"
                                            onChange={(e) => handleQuantityChange(e, product._id)}
                                        />
                                    </td>
                                    <td className="a">${calculateSubtotal(product)}</td>
                                    <td className="a">
                                        <button className="btn" onClick={() => handleRemove(product._id)}>Remove</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <Link to={'/'}>
                    <button className="btn">Continue shopping</button>
                </Link>
            </div>
            <Footer />
        </>
    );
}

export default Addcart;
