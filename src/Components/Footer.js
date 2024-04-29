import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram, faSkype, faLinkedin } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {

    const fa = {
            width: "35px",
            marginRight: "4px",
            padding: "10px",
            /* font-size: 20px; */
            borderRadius: "10px",
            backgroundColor : 'skyblue'
    }
    return (
        <div>
            <div className="container">
                <div className="row gy-2">
                    <div className="col-lg-3 col-12">
                        <h3 style={{ opacity: 0.9, fontWeight: 'bold' }} className="mb-3">Creative Home<span className="text-primary">.</span></h3>

                        <p style={{ width: '60%', fontSize: '14px', opacity: 0.8 }}>A108 Adam Street
                            New York, NY 535022
                            United States</p>
                        <p style={{ opacity: 0.7 }}><span style={{ fontWeight: 'bold' }}>Phone:</span> +1 5589 55488 55</p>
                        <p style={{ opacity: 0.7 }}><span style={{ fontWeight: 'bold' }}>Email:</span> info@example.com</p>
                    </div>
                    <div className="col-lg-3 col-12">
                        <p style={{ fontWeight: 'bold', fontSize: '17px', opacity: 0.9 }}>Useful Links</p>
                        <ul className="list-unstyled mb-5" style={{ opacity: 0.8 }}>
                            <li className="mb-3"><a href="#" style={{ textDecoration: 'none' }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-primary" viewBox="0 0 16 16">
                                <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                            </svg> <span className="text-primary">Home</span></a></li>
                            <li className="mb-3"><a href="#" style={{ textDecoration: 'none' }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-primary" viewBox="0 0 16 16">
                                <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                            </svg> <span className="text-primary">About us</span></a></li>
                            <li className="mb-3"><a href="#" style={{ textDecoration: 'none' }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-primary" viewBox="0 0 16 16">
                                <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                            </svg> <span className="text-primary">Services</span></a></li>
                            <li className="mb-3"><a href="#" style={{ textDecoration: 'none' }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-primary" viewBox="0 0 16 16">
                                <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                            </svg> <span className="text-primary">Terms of service</span></a></li>
                            <li className="mb-3"><a href="#" style={{ textDecoration: 'none' }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-primary" viewBox="0 0 16 16">
                                <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                            </svg> <span className="text-primary">Privacy policy</span></a></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-12">
                        <p style={{ fontWeight: 'bold', fontSize: '17px', opacity: 0.9 }}>Our Services</p>
                        <ol className="list-unstyled" style={{ opacity: 0.8 }}>
                            <li className="mb-3"><a href="#" style={{ textDecoration: 'none' }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-primary" viewBox="0 0 16 16">
                                <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                            </svg> <span className="text-primary">Web Design</span></a></li>
                            <li className="mb-3"><a href="#" style={{ textDecoration: 'none' }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-primary" viewBox="0 0 16 16">
                                <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                            </svg> <span className="text-primary">Web Development</span></a></li>
                            <li className="mb-3"><a href="#" style={{ textDecoration: 'none' }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-primary" viewBox="0 0 16 16">
                                <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                            </svg> <span className="text-primary">Product Management</span></a></li>
                            <li className="mb-3"><a href="#" style={{ textDecoration: 'none' }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-primary" viewBox="0 0 16 16">
                                <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                            </svg> <span className="text-primary">Marketing</span></a></li>
                            <li className="mb-3"><a href="#" style={{ textDecoration: 'none' }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-primary" viewBox="0 0 16 16">
                                <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                            </svg> <span className="text-primary">Graphic Design</span></a></li>
                        </ol>
                    </div>
                    <div className="col-lg-3 col-12">
                        <p style={{ fontWeight: 'bold', fontSize: '17px', opacity: 0.9 }}>Our Social Networks</p>
                        <p>Cras fermentum odio eu feugiat lide par naso tierra videa magna derita valies</p>
                        <div>
                            <a href="#" className="text-decoration-none text-white " style={fa}>
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                            <a href="#" className="text-decoration-none  text-white" style={fa}>
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                            <a href="#" className="text-decoration-none  text-white" style={fa}>
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                            <a href="#" className="text-decoration-none  text-white" style={fa}>
                                <FontAwesomeIcon icon={faSkype} />
                            </a>
                            <a href="#" className="text-decoration-none text-white" style={fa}>
                                <FontAwesomeIcon icon={faLinkedin} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <br /><br />
            {/* Copyright */}
            <div className="container-fluid" style={{ backgroundColor: '#e7f5ff' }}>
                <br />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-12 text-center" style={{ fontSize: "15px" }}><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="bi bi-c-circle" viewBox="0 0 16 16">
                            <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.146 4.992c-1.212 0-1.927.92-1.927 2.502v1.06c0 1.571.703 2.462 1.927 2.462.979 0 1.641-.586 1.729-1.418h1.295v.093c-.1 1.448-1.354 2.467-3.03 2.467-2.091 0-3.269-1.336-3.269-3.603V7.482c0-2.261 1.201-3.638 3.27-3.638 1.681 0 2.935 1.054 3.029 2.572v.088H9.875c-.088-.879-.768-1.512-1.729-1.512Z" />
                        </svg> Copyright <span className="text-dark fw-bold">Creative Home</span>. All Rights Reserved</div>
                        <div className="col-lg-6 col-12 text-center">Designed by<span className="text-primary">  BootstrapMade</span></div>
                    </div>
                </div>
        <br></br><br></br>
                {/* Arrow on right end
                <div className="Up text-primary fixed-bottom"><a href="#" id="myBtn"><svg xmlns="http://www.w3.org/2000/svg" width="56" height="36" fill="currentColor" className="bi bi-file-arrow-up-fill" viewBox="0 0 16 16">
                    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM7.5 6.707 6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707z" />
                </svg></a></div> */}
            </div>
        </div>

    )
}

export default Footer
