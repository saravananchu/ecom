import './index.css'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Header from './Header/header';
import Footer from './Footer/footer';


function Index(){
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

     
    const [products,setProducts]=useState([])

    useEffect(()=>{
        axios.get('http://localhost:3001/index')
.then(resut=>setProducts(resut.data))
.catch(err=>console.log('err'))
    },[])


    const han = (e, user,username) => {
        e.preventDefault();
    
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/"); // Redirect to login if no token
            return;
        }

        axios.post('http://localhost:3001/vog', {
            uname: username,
            name: user.name,
            price: user.price,
            image: user.image
        })
        .then(result => {
            console.log('Product added:', result);
            // Update the product list dynamically without page reload
            // setProducts(products.filter(p => p._id !== user._id)); // Remove added item (for example)
            window.location.reload()
        })
        .catch(err => console.log('Error adding product to cart:', err));
    };


    
    return(
        <>
        <Header/>
        <div className="main mb-5">
        {(username =='Subathra') &&(  <a href='/create'><img src='https://www.shareicon.net/data/2017/05/30/886557_add_512x512.png'className='fot'/></a> 
          )}  <div className="top">
            <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="http://magento2.magentech.com/themes/sm_teco/pub/media/wysiwyg/slideshow/home-1/item-2.jpg" width={1000}  alt="..."/>
      </div>
      <div class="carousel-item">
        <img src="http://magento2.magentech.com/themes/sm_teco/pub/media/wysiwyg/slideshow/home-1/item-1.jpg"  alt="..."/>
      </div>
     
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div><div className='co'>
<div className='view container'>
    <p>View Collection</p>
    <p>

New Product Sale Sale Special Customer: Samsung Chromebook 3, 11.6", 4GB RAM, 16GB eMMC
View Collection
</p></div>
</div>
<div className='mid container'>
    <div className='head mt-5'>
        <h1>
        Why Choose Teco Shop
        </h1>
        <p>Power your sites with latest web technologies</p>
    </div>
    <div className='mid-a'>
    <div className='pay bg-dark text-light'>
        <h3>Payment Secure</h3>
        <p>You should never complain, complaining is a weak emotion, you got life, we breathing, we blessed.</p>
    </div>
    <div className='pay bg-success text-light'>
        <h3>Outstanding Support</h3>
        <p>first of the month is coming, we have get money, we have no choice. they don’t want you to eat</p>
    </div>
    <div className='pay bg-danger text-light'>
        <h3>Fast Free Delivery </h3>
        <p>Congratulations, you played yourself. life you have to take the trash out, if you have trash in your life</p>
    </div>
    </div>
</div>
<div className='product container mt-5'>
{
products.slice().reverse().map((user, index) => (
    <form key={user._id} onSubmit={(e) => han(e, user,username)}>
    <div className='card'>
    <div className='card-body'>
        <Link to={`/view/${user._id}`}>
     
<img src={`http://localhost:3001/Images/${user.image}`} className='ims card-img-top' ></img></Link>
<div className='una'>
  <p>{user.name}</p>
</div>

<p>$ {user.price}</p>
<button type='submit' className='btn'>add to cart</button>
    </div>
    
    </div>
    </form>
))}

</div>

<div className='container my-5'>
    <img src='http://magento2.magentech.com/themes/sm_teco/pub/media/wysiwyg/banner/item-1.jpg'></img>
</div>


<div className='product container mt-5'>
{
products.slice().map((user, index) => (
    <form key={user._id} onSubmit={(e) => han(e, user,username)}>
    <div className='card'>
    <div className='card-body'>
        <Link to={`/view/${user._id}`}>
<img src={`http://localhost:3001/Images/${user.image}`} className='card-img-top ims' ></img></Link>
<div className='una'>
  <p>{user.name}</p>
</div>
<p>$ {user.price}</p>
<button type='submit' className='btn'>add to cart</button>
    </div>
    
    </div>
    </form>
))}

</div>

            </div>
        </div><Footer/>
        
        </>
    )
}
export default Index