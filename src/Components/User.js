import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Navbar } from 'react-bootstrap'
import NavBar from './NavBar';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AboutUs from './AboutUs';
import Footer from './Footer';
// import Footer from './Footer';

const User = () => {
  
  const [formData, setFormData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSelectChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    console.log(category)
    // Call handleSubmit immediately when the category changes
    handleSubmit(category);
  };

  const handleSubmit = (category) => {
    fetch(`http://localhost:8080/product/${category}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setFormData(data);
      })
      .catch((error) => {
        console.error("Error during fetch", error);
      });
  };

  useEffect(() => {
    // Initial fetch when the component mounts
    handleSubmit(selectedCategory);
  }, [selectedCategory]); // Call useEffect whenever selectedCategory changes

  return (
    <div>
    <NavBar />
{/* Starting Carousel */}
<br></br>
<div className='container'>

<div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="5000">
      <img src="./Images/Car1.jpg" class="d-block w-100" alt="..." style={{height : "350px", filter: 'brightness(40%)'}}/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Furniture</h5>
        <p>"Graceful Living, Graceful Furniture"</p>
      </div>
    </div>
    <div class="carousel-item"  data-bs-interval="5000">
      <img src="./Images/Car2.jpg" class="d-block w-100" alt="..." style={{height : "350px", filter: 'brightness(40%)'}}/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Sofas and Seatings</h5>
        <p>"Discover Comfort, Discover Home"</p>
      </div>
    </div>
    <div class="carousel-item" data-bs-interval="5000">
      <img src="./Images/Car3.jpg" class="d-block w-100" alt="..." style={{height : "350px", filter: 'brightness(40%)'}}/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Lamps and Lightings</h5>
        <p>"Brighter moments on a darker night"</p>
      </div>
    </div>
    <div class="carousel-item" data-bs-interval="5000">
      <img src="./Images/Car4.jpg" class="d-block w-100" alt="..." style={{height : "350px", filter: 'brightness(40%)'}}/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Home Decor</h5>
        <p>"Your Dream Home, Our Passion"</p>
      </div>
    </div>
  </div>
</div>
   </div>

   <AboutUs />
<br></br>

<div className='container'>
  <br></br><br></br>
  <h1 className="text-center" style={{fontSize : '32px', color: '#84cdee', fontWeight:'bold'}}><font style={{color : "black"}}>C</font>ategories</h1>
  <br></br>
      <div className="container row">
       
       <div className='col-3'>
        <Link to="/furniture/Furniture"><img src='./Images/HomeW.jpg' style={{height: "200px", width : "250px", borderRadius : '50px'}}/></Link>
        <div className='text-center' style={{color : '#84cdee', fontSize : '20px', fontWeight : 'bold'}}>Home Decor</div>
        </div> 
        <div className='col-3'>
        <Link to="/sofa/Sofas&Seating"  className='col-3'><img src='./Images/mirror!.jpg' style={{height: "200px", width : "250px", borderRadius : '50px'}}/></Link>
        <div className='text-center' style={{color : '#84cdee', fontSize : '20px', fontWeight : 'bold'}}>Mirrors</div>
        </div>
        <div className='col-3'>
        <Link to="/home/HomeDecor" className='col-3'><img src='./Images/LampW.webp' style={{height: "200px", width : "250px", borderRadius : '50px'}}/></Link>
        <div className='text-center' style={{color : '#84cdee', fontSize : '20px', fontWeight : 'bold'}}>Lamps & Lightings</div>
        </div>
        <div className='col-3'>
        <Link to="/kitchen/Lamps&Lightings" className='col-3'><img src='./Images/SofaW.webp' style={{height: "200px", width : "270px", borderRadius : '50px'}}/></Link>
        <div className='text-center' style={{color : '#84cdee', fontSize : '20px', fontWeight : 'bold'}}>Sofa&Seating</div>
        </div>

        </div>
      <br></br>
</div>
     
    <br></br>
    <div id='contact'></div>
    <br></br> <br></br><br></br><br></br>
    <hr />
     
    {/* <Footer /> */}
    <Footer />
    </div>
  )
}

export default User
