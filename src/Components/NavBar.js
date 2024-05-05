import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../logo1.PNG'
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate()
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // Perform logout logic...
    // setIsLoggedIn(false);
    // Remove user ID from sessionStorage
    sessionStorage.removeItem('userId');
    navigate("/")
  };

  const logo1 = {
    border: '2px',
    borderRadius: '5px'

  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <br></br>
      <div className="container-fluid">
        <a className="navbar-brand" href="#"><img className='logo1' style={{ height: '70px', width: '100px' }} src={Logo} /></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active fw-bold" aria-current="page" href="/">HOME</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active  fw-bold" href="/">
                ABOUT
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active fw-bold" href="#category">
                CATEGORY
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active fw-bold" href="/">
              BLOG
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active fw-bold" href="/">
               PAGES
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active fw-bold" href="#contact">CONTACT</a>
            </li>
          </ul>
          <div className="d-flex">
            <input className='p-2' type="search" placeholder="Search" aria-label="Search" style={{ borderRadius: "10px" }} />
            <div className="p-2">
              <div className="nav-item dropdown">
                {/* Account link with dropdown toggle */}
                <a
                  className="nav-link active fw-bold dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  onClick={toggleDropdown}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="text-primary" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                  </svg>
                  <font className="text-dark p-1">Account</font>
                </a>

                {/* Dropdown menu */}
                <div className={`dropdown-menu${dropdownOpen ? ' show' : ''}`} aria-labelledby="navbarDropdown">
                  {/* Dropdown items */}
                  <a className="dropdown-item" href="/login/price">Admin</a>
                  <a className="dropdown-item" href="" onClick={handleLogout}>Logout</a>
                </div>
              </div>
            </div>
            <div className="p-2"><a className="nav-link active fw-bold" href="/wish" style={{ textDecoration: 'none' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="text-danger" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
              </svg><font className="text-dark p-1">WishList</font>
            </a></div>
            <div className="p-2"><a className="nav-link active fw-bold" href="/cart" style={{ textDecoration: 'none' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-primary" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg><font className="text-dark p-1">  Cart</font>
            </a></div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;