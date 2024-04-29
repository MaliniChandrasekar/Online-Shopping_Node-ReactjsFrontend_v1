import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

const SofaSeating = () => {

  const { category } = useParams();
  const [setSofa, setSelectedSofa] = useState()
  const handleSubmit = (event) => {
    axios.get("http://localhost:8080/product/Mirrors")
      .then((res) => {
        console.log("===Res===", category)
        setSelectedSofa(res.data);
        console.log(res.data)
      })

      .catch((err) => {
        console.log("error", err);
      })

  }

  useEffect(() => {
    handleSubmit()
  }, []);
  const CartSend = ({ formData }) => {
    console.log(formData)
    fetch("http://localhost:8080/shop/addcart", {
      headers: {
        "Content-Type": "application/json"
      },
      method: 'post',
      body: JSON.stringify(formData)
    })
      .then((response) => {
        console.log("Data received " + response);
      })
    alert("Product Added to Cart..!");
  }
  const WishSend = ({ formData }) => {
    console.log(formData)
    fetch("http://localhost:8080/shop/addwish", {
      headers: {
        "Content-Type": "application/json"
      },
      method: 'post',
      body: JSON.stringify(formData)
    })
      .then((response) => {
        console.log("Data received " + response);
      })
    alert("Product Added to WishList..!");
  }
  return (
    <div>
      <NavBar />
      <div className='container'>
        <br></br>
        <h1 className='text-center' style={{ fontSize: '28px', color: '#84cdee', fontWeight: 'bold' }}><font style={{ color: "black" }}>M</font>irrors</h1>
        <br></br>
        <div className='row gy-5 p-3' style={{width : '1500px', rowGap : '30px'}}>
          {Array.isArray(setSofa) && setSofa.map((formData) => (
            <div className='col-3 m-2 p-3' style={{backgroundColor : '#edf7fc',boxShadow : "10px 10px 10px black", borderRadius : "20px", height : "450px"}}>
              <div className='row'>
                <div className='col-12 text-center'>
                <img src={`http://localhost:8080/public/data/uploads/${formData.image}`} style={{borderTopLeftRadius: '10px', borderTopRightRadius : '10px',height : '200px', width : "330px"}} alt="Image not Found!" />
             </div>
              <div className='col-12'>
              <h5>{formData.productname}</h5>
              </div>
                <div className='row'>
                  <div className='col-6'><p>{formData.description}</p></div>
                  <div className='col-6 text-end'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill text-danger" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill text-danger" viewBox="0 0 16 16">
                     <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                   </svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill text-danger" viewBox="0 0 16 16">
                     <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                   </svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill text-danger" viewBox="0 0 16 16">
                     <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                   </svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill text-danger" viewBox="0 0 16 16">
                     <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                 </svg></div>
                </div>
              <div className='col-12 text-danger' style={{fontSize : '20px'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-rupee" viewBox="0 0 16 16">
                  <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
                 </svg>{formData.price}
              </div>
              <div className='row p-3'>
               <div className='col'>   <button onClick={() => CartSend({ formData })} style={{borderRadius : '10px', padding : '5px', width:'130px'}}>Add to Cart</button></div>
               <div className='col text-end'>    <div onClick={() => WishSend({ formData })} style={{ borderRadius: '10px', padding: '5px', width: '130px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="text-dark" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                  </svg></div></div> </div>
              </div>

            </div>
          ))}
        </div>
      </div>
      <br></br><br></br>
      <Footer />
    </div>
      )
}

export default SofaSeating
