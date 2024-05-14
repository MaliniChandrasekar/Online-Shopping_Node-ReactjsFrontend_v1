import React, { useState } from 'react'
import { useEffect } from 'react';
import NavBar from './NavBar';


const Order = () => {

    const userId = sessionStorage.getItem('userId')
    const [setCart, setCartItems] = useState([])
    const [setOrder, setOrderItems] = useState()
    const expectedDeliveryDays = 7; // Example value
    const currentDate = new Date();

    const expectedDeliveryDate = new Date(currentDate);
    expectedDeliveryDate.setDate(currentDate.getDate() + expectedDeliveryDays);


    useEffect(() => {
        console.log("userId", userId)
        fetch(`http://localhost:8080/order/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                setCartItems(data.items);
                console.log(data._id)
                setOrderItems(data)
                console.log("Current", data.items)
                // calculateTotalPrice(data);
            })
            .catch(error => {
                console.error('Error during fetch', error);
            });
    }, []);

    return (
        <div>
            <NavBar />
            <br></br>
            <div className='text-center' style={{ fontWeight: "bold", color: "purple", fontSize: '20px' }}>MY ORDERS</div>
            <div className='container'>
                <br></br>
                <table className="table table-bordered border-dark text-center">
                    <thead>
                        <tr>
                            <th scope='col'>Order Id</th>
                            <th scope="col">Image</th>
                            <th scope="col">ProductName</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">TotalPrice</th>
                            <th scope='col'>Ordered Date </th>
                            <th scope='col'>Expected Delivered Date</th>
                            <th scope='col'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(setCart) && setCart.map((items, index) => (
                            <tr key={index}>
                                {index === 0 ? ( // Render order ID only for the first item
                                    <td rowSpan={setCart.length} style={{ verticalAlign: 'middle', textAlign: 'center' }}>{setOrder._id}</td>
                                ) : null}
                                <td>
                                    <img src={`http://localhost:8080/public/data/uploads/${items.product.image}`} style={{ height: '70px', width: "70px", border: '1px solid white', borderRadius: '10px' }} alt="Product" />
                                </td>
                                <td>{items.product.productname}</td>
                                <td>{items.quantity}</td>
                                <td>{items.price}</td>
                                <td>{new Date(items.date).toLocaleString()}</td>
                                <td>{expectedDeliveryDate.toLocaleDateString()}</td>
                                <td>
                                    <button style={{ backgroundColor: "green", color: "white", borderRadius: "7px" }}>
                                        Shipped Shortly
                                    </button>
                                </td>                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Order
