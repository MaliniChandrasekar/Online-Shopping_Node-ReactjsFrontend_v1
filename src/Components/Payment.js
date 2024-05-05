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
  const [errors, setErrors] = useState({});


  const validateForm = () => {
    const errors = {};

    // Card Number validation
    if (!/^\d{16}$/.test(cardNumber)) {
      errors.cardNumber = 'Invalid card number. Must be 16 digits.';
    }

    // Expiry Date validation
    if (!/^\d{2}\/\d{4}$/.test(expiryDate)) {
      errors.expiryDate = 'Invalid expiry date. Must be in the format MM/YYYY.';
    }

    // CVV validation
    if (!/^\d{3}$/.test(cvv)) {
      errors.cvv = 'Invalid CVV. Must be 3 digits.';
    }

    // Name validation
    if (name.trim() === '') {
      errors.name = 'Name on card is required.';
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors === null) {
      alert('Payment submitted');
      alert('Your order has been Placed');
      navigate("/");
    } else {
      // Notify the user about validation errors
      for (const field in validationErrors) {
        alert(validationErrors[field]);
      }
      setErrors(validationErrors);
    }
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
      <div className='text-center text-primary' style={{ fontWeight: 'bold', fontSize: '22px', fontStyle: 'italic' }}>Payment Details</div>
      <br></br>

      <div className='text-center border p-4' style={{ height: '550px', backgroundColor: '#e1eaef', borderRadius: "15px" }}>
        <div className="mb-3">
          <label htmlFor="cardNumber" className="form-label">
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" class="text-danger" viewBox="0 0 16 16">
              <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1" />
            </svg>
             Card Number
          </label>
          <input className="form-control" id="cardNumber" value={cardNumber} type="tel" placeholder='0000 0000 0000 0000' pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}" onChange={(e) => setCardNumber(e.target.value)} required />
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="expiryDate" className="form-label"><svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" class="text-danger" viewBox="0 0 16 16">
              <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1" />
            </svg>Expiry Date</label>
            <input type="text" placeholder='mm/yyyy' className="form-control" id="expiryDate" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
          </div>
          <div className="col">
            <label htmlFor="cvv" className="form-label"><svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" class="text-danger" viewBox="0 0 16 16">
              <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1" />
            </svg>CVV</label>
            <input type="text" placeholder='000' className="form-control" id="cvv" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label"><svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" class="text-danger" viewBox="0 0 16 16">
              <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1" />
            </svg>Name on Card</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input type="number" className="form-control" id="amount" value={price} required />
        </div>
        <div className="mb-3">
          <label htmlFor="gst" className="form-label">GST (%)</label>
          <input type="number" className="form-control" id="gst" value={12} required readOnly />
        </div>
        <p>Total Amount (with GST): <input type='number' value={totalAmount} /></p>
        <button type="button" className="btn btn-primary" onClick={handlePaymentSubmit}>Submit Payment</button>
      </div>
    </div>

  )
}

export default Payment
