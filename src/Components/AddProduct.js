import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bg1 from '../bg1.avif';

export const AddProduct = () => {

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

        const response = await axios.post('http://localhost:8080/product/insert', formDataToSend, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log('Product added:', response.data);
          alert('Product Added');

          window.location.reload();
        } catch (error) {
          console.error('Error adding product:', error);
        }
      }
    }
  return (
    <div style={{
      backgroundImage: `linear-gradient(rgba(248, 247, 247, 0.3), rgba(248, 247, 247, 0.7)), url(${bg1})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="container p-2">
       
        <p>Product Name: <input type="text" name="productname" value={formData.productname} onChange={handleChange} /></p>
        <p>Description: <input type="text" name="description" value={formData.description} onChange={handleChange} /></p>
        <p>Price: <input type="number" name="price" value={formData.price} onChange={handleChange} /></p>
        <p>Category Name:
          <select value={selectedCategory} onChange={handleSelectChange} name="categoryname">
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
      </div>
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
};
