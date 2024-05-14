import React, { useState, useEffect } from 'react';
import location from '../save.png'
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Location = () => {
    const { price } = useParams()
    const [userData, setUserData] = useState(null);
    const [addressData, setAddressData] = useState({
        doorno: '',
        street: '',
        city: '',
        state: '',
        pincode: ''
    });
    const userId = sessionStorage.getItem('userId');
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        console.log(addressData)
        const data = {
            doorno: addressData.doorno,
            street: addressData.street,
            city: addressData.city,
            state: addressData.state,
            pincode: addressData.pincode
          }
          fetch(`http://localhost:8080/user/${userId}`, {
              headers: {
                "Content-Type": "application/json"
              },
              method: 'post',
              body: JSON.stringify(data)
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Failed to register user");
                }
                console.log("Data received ", response);
                alert("Delivery address added..!");
                navigate(`/payment/${price}`)
              })
              .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred while registering");
              });
          }


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/user/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                if (data && data.address) {
                    setUserData(data);
                    setAddressData(data.address); // Initialize address data
                }
            } catch (error) {
                console.error('Error during fetch', error);
                // Handle the error here, e.g., show a message to the user
            }
        };

        fetchUserData();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddressData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const inputStyle = {
        // width: "100%",
        padding: "4px",
        // marginBottom: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        boxSizing: "border-box"
    };

    return (
        <div style={{ position: "relative" }}>
            <img src={location} style={{ height: "640px", width: "1349px" }} />

            <div style={{
                position: "absolute",
                top: "100px",
                right: "220px",
            }}>
                {userData && (
                    <div>
                        <div className='text-center' style={{ color: "blue", fontSize: "25px", fontWeight: "bold", marginBottom: "10px" }}>Delivery Address</div>
                        <div className='p-5' style={{
                            height: "360px",
                            width: "400px",
                            backgroundColor: "white",
                            border: "2px solid skyblue",
                            borderRadius: "20px",
                            color: "blue",
                            fontWeight: "bold"
                        }}>
                            <p>Door No : <input type='number' placeholder='enter your doorno' name='doorno' value={addressData.doorno} onChange={handleChange} /></p>
                            <p>Street : <input type='text' placeholder='enter your street' name='street' value={addressData.street} onChange={handleChange} /></p>
                            <p>City : <input type='text' placeholder='enter your city' name='city' value={addressData.city} onChange={handleChange} required /></p>
                            <p>State : <input type='text' placeholder='enter your state' name='state' value={addressData.state} onChange={handleChange} /></p>
                            <p>Pincode : <input type='number' placeholder='enter your pincode' name='pincode' value={addressData.pincode} onChange={handleChange} /></p>

                            <div className='text-center' >
                                
                                    <button onClick={(e) => {handleSubmit(e)}}  style={{ backgroundColor: "green", color: "white", fontWeight: "bold" }}>Confirm</button>
                                    <Link to={`/payment/${price}`}>   
                                    <button className='m-2' style={{ backgroundColor: "green", color: "white", fontWeight: "bold" }}>Skip</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default Location;
