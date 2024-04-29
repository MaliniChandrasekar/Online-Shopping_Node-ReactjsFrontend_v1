import React, { useEffect } from 'react'
import { useState } from 'react'

const AddCategory = () => {

    const [formData, setData] = useState({
        categoryname:'',
        categorydesc : '',
      })
    
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setData({ ...formData, [name]: value })
        console.log(name, value);
      }
      const handleSubmit = (event) => {
        // event.preventDefault();
        console.log(formData);
        if (formData.categoryname && formData.categorydesc == " ") {
          console.log("Noooo")
        } else {
          const category = {
            categoryname: formData.categoryname,
            categorydesc: formData.categorydesc,
          }
    
          fetch("http://localhost:8080/shop/addcategory", {
            headers: {
              "Content-Type": "application/json"
            },
            method: 'post',
            body: JSON.stringify(category)
          })
            .then((response) => {
              console.log("Data received " + response);
            })
    
        }
      }
      
  return (
    <div>
      <p >Category Name : <input type='text' placeholder='enter your categoryname' name='categoryname' value={formData.categoryname} onChange={handleChange} /></p>
        <p>Description : <input type='text' placeholder='enter your description' name='categorydesc' value={formData.categorydesc} onChange={handleChange} /></p>
        <button onClick={() => handleSubmit()}>Add Category</button>
    </div>
  )
}

export default AddCategory
