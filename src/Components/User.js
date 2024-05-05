import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Navbar } from 'react-bootstrap'
import NavBar from './NavBar';
import { Carousel } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import AboutUs from './AboutUs';
import Footer from './Footer';
import axios from 'axios';
import './wish.css';
// import Footer from './Footer';

const User = () => {

  const location = useLocation()
  const [cartUpdated, setCartUpdated] = useState(false);
  const userId = sessionStorage.getItem('userId');

  const [selectedCategory, setSelectedCategory] = useState('');
  const [setFurniture, setSelectedFurniture] = useState('');
  const [isInWishlist, setIsInWishlist] = useState(false);

  console.log("Get Session storage ", userId)
  const handleSelectChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    console.log("sUBMIT", category)
    // Call handleSubmit immediately when the category changes
    handleSubmit(category);
  };

  const handleSubmit = (category) => {
    let url = `http://localhost:8080/product`;
    if (category) {
      url += `/${category}`;
    }
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setSelectedFurniture(data);
      })
      .catch((error) => {
        console.error("Error during fetch", error);
      });
  };

  useEffect(() => {
    // Initial fetch when the component mounts
    handleSubmit(selectedCategory);
  }, [selectedCategory]); // Call useEffect whenever selectedCategory changes

  const CartSend = async (formData) => {
    console.log("Productid", formData)
    console.log("userID", userId)
    try {
      const response = await axios.post('http://localhost:8080/cart/add', {
        userId: userId,
        productId: formData,
        quantity: 1
      });
      console.log(response.data); // Log the response from the backend
      alert("Product added to cart successfully..!");
      setCartUpdated(prevState => !prevState);

      // You can update the UI or show a notification based on the response
    } catch (error) {
      console.error('Error adding item to cart:', error);
      // Handle error scenarios
    }
  };
  const WishSend = async (formData) => {
    try {
      // Ensure userId is available
      if (!userId) {
        console.error('User ID is not available');
        return;
      }
  
      // Ensure formData is not empty
      if (!formData) {
        console.error('Product ID is required');
        return;
      }
  
      const response = await axios.post('http://localhost:8080/wish/add', {
        userId: userId,
        productId: formData
      });
  
      // Check if the response is successful
      if (response.status === 200) {
        alert("Product added to Wishlist successfully!");
        setIsInWishlist(true); // Update the state after successfully adding to wishlist
      } else if (response.status === 400) {
        // Check if the error message is "Product already exists in wishlist"
        if (response.data && response.data.message === "Product already exists in wishlist") {
          alert("Product already exists in wishlist");
        } else {
          // Handle other 400 errors
          console.error('Failed to add item to wishlist:', response.data);
        }
      }
    } catch (error) {
      alert("Product already exists in wishlist");
    }
  };
  
  

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
              <img src="./Images/Car1.jpg" class="d-block w-100" alt="..." style={{ height: "350px", filter: 'brightness(40%)' }} />
              <div class="carousel-caption d-none d-md-block">
                <h5>Furniture</h5>
                <p>"Graceful Living, Graceful Furniture"</p>
              </div>
            </div>
            <div class="carousel-item" data-bs-interval="5000">
              <img src="./Images/Car2.jpg" class="d-block w-100" alt="..." style={{ height: "350px", filter: 'brightness(40%)' }} />
              <div class="carousel-caption d-none d-md-block">
                <h5>Sofas and Seatings</h5>
                <p>"Discover Comfort, Discover Home"</p>
              </div>
            </div>
            <div class="carousel-item" data-bs-interval="5000">
              <img src="./Images/Car3.jpg" class="d-block w-100" alt="..." style={{ height: "350px", filter: 'brightness(40%)' }} />
              <div class="carousel-caption d-none d-md-block">
                <h5>Lamps and Lightings</h5>
                <p>"Brighter moments on a darker night"</p>
              </div>
            </div>
            <div class="carousel-item" data-bs-interval="5000">
              <img src="./Images/Car4.jpg" class="d-block w-100" alt="..." style={{ height: "350px", filter: 'brightness(40%)' }} />
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
      <div id='category'></div>
        <br></br><br></br>
        <h1 className="text-center" style={{ fontSize: '32px', color: '#84cdee', fontWeight: 'bold' }}><font style={{ color: "black" }}>C</font>ategories</h1>
        <br></br>
        <div className="container row">

          <div className='col-3'>
            <div><img src='./Images/HomeW.jpg' style={{ height: "200px", width: "250px", borderRadius: '50px' }} /></div>
            <div className='text-center' style={{ color: '#84cdee', fontSize: '20px', fontWeight: 'bold' }}>Home Decor</div>
          </div>
          <div className='col-3'>
            <div className='col-3'><img src='./Images/mirror!.jpg' style={{ height: "200px", width: "250px", borderRadius: '50px' }} /></div>
            <div className='text-center' style={{ color: '#84cdee', fontSize: '20px', fontWeight: 'bold' }}>Mirrors</div>
          </div>
          <div className='col-3'>
            <div className='col-3'><img src='./Images/LampW.webp' style={{ height: "200px", width: "250px", borderRadius: '50px' }} /></div>
            <div className='text-center' style={{ color: '#84cdee', fontSize: '20px', fontWeight: 'bold' }}>Lamps & Lightings</div>
          </div>
          <div className='col-3'>
            <div className='col-3'><img src='./Images/SofaW.webp' style={{ height: "200px", width: "270px", borderRadius: '50px' }} /></div>
            <div className='text-center' style={{ color: '#84cdee', fontSize: '20px', fontWeight: 'bold' }}>Sofa&Seating</div>
          </div>

        </div>
        <br></br>
      </div>
      <br></br>
      <div className='container'>
        <p style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', width: '50%' }}>
          <span style={{
            marginRight: '10px',
            fontSize: "24px",
            fontWeight: "bolder",
            backgroundImage: 'linear-gradient(45deg, black, skyblue)', // Gradient from pink to blue
            WebkitBackgroundClip: 'text', // Clip text to background to show gradient
            WebkitTextFillColor: 'transparent'
          }}>Category Name:</span>

          <select id="category" value={selectedCategory} onChange={handleSelectChange}
            style={{
              flex: '1', // Make the select box take the remaining width
              minWidth: '50%', // Set minimum width to 50%
              padding: '8px', // Add padding for better readability
              borderRadius: '5px', // Add some border radius for a rounded appearance
              border: '1px solid black', // Add a border for better separation
              backgroundColor: '#f7f7f7', // Add a background color
              fontSize: '16px', // Set font size
            }}
          >
            <option value="">All</option>
            <option>Home Decor</option>
            <option>Mirrors</option>
            <option>Lamps and Lightings</option>
            <option>Sofa&Seating</option>
          </select>
        </p>
      </div>
      <div className='container'>
        <br></br>

        <br></br>
        <div className='row gy-5' style={{ maxWidth: '1500px', margin: '0 auto', rowGap: '30px', overflowX: 'auto' }}>
          {Array.isArray(setFurniture) && setFurniture.map((formData, index) => (
            <div key={index} className='col-3 m-3 p-3' style={{ backgroundColor: '#edf7fc', boxShadow: "10px 10px 10px black", borderRadius: "20px", minHeight: "450px", minWidth: "330px", position: 'relative' }}>

              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '250px', overflow: 'hidden', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
                <img src={`http://localhost:8080/public/data/uploads/${formData.image}`} style={{ width: '100%', height: '100%' }} alt="Image not Found!" />
              </div>
              <br></br><br></br><br>
              </br>
              <br></br><br></br><br>
              </br>
              <br></br><br></br><br>
              </br><br></br><br></br>
              <div className='row'>
                <div className='col-12'>
                  <h5>{formData.productname}</h5>
                </div>
                <div className='row'>
                  <div className='col-6'><p>{formData.description}</p></div>
                  <div className='col-6 text-end'>
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill text-danger" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div className='col-12 text-danger' style={{ fontSize: '20px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-rupee" viewBox="0 0 16 16">
                    <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
                  </svg>{formData.price}
                </div>
                <div className='row p-3'>
                  <div className='col'>
                    {userId ? (
                      <button onClick={() => CartSend(formData._id)} style={{ borderRadius: '10px', padding: '5px', width: '100%' }}>Add to Cart</button>
                    ) : (
                      <Link to={`/login/JK?redirect=${encodeURIComponent(location.pathname)}`}><button style={{ borderRadius: '10px', padding: '5px', width: '100%' }}>Login to Add to Cart</button></Link>
                    )}
                  </div>

                  <div className='col text-end'>
                    {userId ? (
                      <p onClick={() => WishSend(formData._id)} style={{ borderRadius:
                       '10px', padding: '5px', width: '100%' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16" className={`text-danger ${isInWishlist ? 'filled' : ''}`}>
                          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                        </svg>
                      </p>
                    ) : (
                      <Link to={`/login/JK?redirect=${encodeURIComponent(location.pathname)}`}><button style={{ borderRadius: '10px', padding: '5px', width: '100%' }}>Login to Add to WishList</button></Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
