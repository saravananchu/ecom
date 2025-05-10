import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './view.css'
import Header from "./Header/header";
import Footer from "./Footer/footer";

function View() {
  const { id } = useParams();
  const [username, setUsername] = useState(null);
      const navigate=useNavigate()
      // username get
      useEffect(() => {
          const token = localStorage.getItem("token");
          const storedUsername = localStorage.getItem("username"); // Retrieve username
      
          if (!token) {
            navigate("/"); // Redirect to login if no token exists
          } else {
            setUsername(storedUsername); // Set the username from localStorage
        
          }
        }, [navigate]);
  

  
  // State for the product
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    details: "",
    image: null,
  });

  // State for related products
  const [products, setProducts] = useState([]);

  // Load the current product details
  useEffect(() => {
    axios
      .get(`http://localhost:3001/view/${id}`)
      .then((result) => {
        setProduct(result.data);
      })
      .catch((err) => {
        console.error("Error loading product details:", err);
      });
  }, [id]);

  // Load all products for related products section
  useEffect(() => {
    axios
      .get('http://localhost:3001/get')
      .then((result) => {
        setProducts(result.data);
      })
      .catch((err) => {
        console.error("Error loading products:", err);
      });
  }, []);

  const handleAddToCart = (e, user,username) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/"); // Redirect to login if no token
        return;
    }
    axios
      .post('http://localhost:3001/cart', {uname:username, name: user.name, price: user.price, image: user.image })
      .then(() => {
        window.location.reload()
      })
      .catch((err) => {
        console.error("Error adding to cart:", err);
      });
  };

  const handleAddToCartRelated = (e, user,username) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/"); // Redirect to login if no token
        return;
    }
    axios
      .post('http://localhost:3001/carts', {uname:username, name: user.name, price: user.price, image: user.image })
      .then(() => {
        window.location.reload()
      })
      .catch((err) => {
        console.error("Error adding related product to cart:", err);
      });
  };

  return (<>
    <Header/>
    <div className="main mt-3 mb-5">
    {(username =='Subathra') &&(  <a href='/create'><img src='https://www.shareicon.net/data/2017/05/30/886557_add_512x512.png'className='fot'/></a> 
          )}
      {/* Product form */}
      <form onSubmit={(e) => handleAddToCart(e, product,username)}>
        <div className="pro">
          <div className="left container">
            <div className="card">
              <div className="card-body">
                <img src={`http://localhost:3001/Images/${product.image}`} className="im" alt={product.name} />
         
              </div>
            </div>
          </div>
          
          <div className="right">
            <div className="d-block">
              <h1>{product.name}</h1>
            </div>
            <div className="d-flex">
              <p>view:100</p>
              <p>|</p>
              <p> SKU:OT-102463</p>
              <h5 className="text-success mx-5">In stock</h5>
            </div>
            <h5>{product.price}$</h5>
            <p>{product.description}</p>
            <button className="btn" type="submit">Add to cart</button>
          </div>
        </div>
      </form>

      {/* Product details */}
      <div className="container mt-5">
        <p>{product.details}</p>
      </div>

      {/* Related products section */}
      <div className="container">
        <div className="he">
          <h5>Related Products</h5>
        </div>
        <div className="ret mt-5">
          {products.slice().reverse().map((user) => (
            <form key={user._id} onSubmit={(e) => handleAddToCartRelated(e, user,username)}>
              <div className="card">
                <div className="card-body">
                  <Link to={`/view/${user._id}`}>
                    <img src={`http://localhost:3001/Images/${user.image}`} className="im" alt={user.name} />
                  </Link>
                  <div className='una'>
  <p>{user.name}</p>
</div>
                  <p>$ {user.price}</p>
                  <button className="btn" type="submit">Add to cart</button>
                </div>
              </div>
            </form>
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default View;
