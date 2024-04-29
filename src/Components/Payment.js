import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Payment = () => {

  const navigate = useNavigate();
  const { price } = useParams();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [gst, setGst] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
      alert('Payment submitted');
      alert('Your order has been Placed')
      navigate("/user")
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [price, gst]);

  const calculateTotalAmount = () => {
    const subTotal = parseFloat(price);
    const gstAmount = (subTotal * parseFloat(12)) / 100;
    const total = subTotal + gstAmount;
    setTotalAmount(parseFloat(total).toFixed(2));
  };


  return (
      <div className="container w-50"><br></br>
        <div className='text-center text-primary' style={{ fontWeight : 'bold', fontSize : '22px', fontStyle : 'italic'}}>Payment Details</div>
<br></br>
        
        <div className='text-center border p-4' style={{height:'550px', backgroundColor : '#e1eaef', borderRadius : "15px"}}>
          <div className="mb-3">
            <label htmlFor="cardNumber" className="form-label">Card Number</label>
            <input className="form-control" id="cardNumber" value={cardNumber} type="tel" placeholder='0000 0000 0000 0000' pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}" onChange={(e) => setCardNumber(e.target.value)} required />
          </div>
          <div className="row mb-3">
            <div className="col">
            <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
            <input type="text" placeholder='mm/yyyy' className="form-control" id="expiryDate" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)}  required />
          </div>
          <div className="col">
            <label htmlFor="cvv" className="form-label">CVV</label>
            <input type="text" placeholder='000' className="form-control" id="cvv" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name on Card</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input type="number" className="form-control" id="amount" value={price} required />
        </div>
        <div className="mb-3">
          <label htmlFor="gst" className="form-label">GST (%)</label>
          <input type="number" className="form-control" id="gst" value={12} required readOnly/>
        </div>
         <p>Total Amount (with GST): <input type='number' value={totalAmount} /></p>
        <button type="button" className="btn btn-primary" onClick={handlePaymentSubmit}>Submit Payment</button>
      </div>
    </div>

  )
}

export default Payment
