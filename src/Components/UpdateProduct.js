import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateProduct = ({ id }) => {
  console.log("Get",id)
  // const { productid } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    productname: "",
    description: "",
    price: "",
    categoryname: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (
      formData.productname.trim().length === 0 ||
      formData.description.trim().length === 0 ||
      formData.price.trim().length === 0 ||
      !selectedImage ||
      selectedCategory.trim().length === 0
    ) {
      alert("Please fill all the fields");
    } else {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('image', selectedImage);
        formDataToSend.append('productname', formData.productname);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('categoryname', selectedCategory);
  
        // Make PUT request with FormData object
        const response = await axios.put(`http://localhost:8080/product/${id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
        console.log('Product updated:', response.data);
        alert('Product updated');
      } catch (error) {
        console.error('Error updating product:', error);
        alert('Failed to update product');
      }
    }
  };
  
    console.log("inside : ", id)
const bg = {
  // backgroundImage:`linear-gradient(rgba(248, 247, 247, 0.1),rgba(248, 247, 247, 0.7)), url('./Images/bg1.png')`, 
  // backgroundSize: 'cover',
  // backgroundPosition: 'center'
}
const content = {

  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  padding: '30px',
  borderRadius: '8px',
  boxShadow: '10px 10px 10px black',
  // width: '430px',
  // height : '400px',
  fontSize: '18px',
    color: '#1f2535',
    fontWeight: 'bold',
    fontStyle: 'italic',
};
  return (
    <div style={bg}>
      <div class="container">
      <div>
        <div className='text-center' style={{height:'620px'}}>
          <div style={content} >
        <p >Product ID : <input type='text' placeholder='enter your productid' name='productid' value={id} onChange={handleChange} />{formData.productid}</p>
        <p >Product Name : <input type='text' placeholder='enter your productname' name='productname' value={formData.productname} onChange={handleChange} /></p>
        <p>Description : <input type='text' placeholder='enter your description' name='description' value={formData.description} onChange={handleChange} /></p>
        <p>Price : <input type='number' placeholder='enter your price' name='price' value={formData.price} onChange={handleChange} /></p>
        <p>
          Category Name:

          <select id="category" value={selectedCategory} onChange={handleSelectChange}>
            <option value="">Select category...</option>
            <option>Home Decor</option>
            <option>Mirrors</option>
            <option>Lamps and Lightings</option>
            <option>Sofa&Seating</option>
          </select>
        </p>
        <input type="file" name="image" onChange={handleFileChange} />
        {selectedImage && 
        <div>
        <img alt="Preview" width="250px" src={URL.createObjectURL(selectedImage)} />
        <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
        } 
         <button className='m-2' onClick={() => handleSubmit()}>Update</button>
         </div>
      </div>
     
    </div>
    
    </div>
    
    </div>
  )
}

export default UpdateProduct
