import React from 'react'
import { useState, useEffect } from 'react'
import UpdateProduct from './UpdateProduct';
import {Offcanvas } from 'react-bootstrap';


const AvailableProduct = ({ onClose, onDelete }) => {

  const [show, setShow] = useState(false);

  const [id, setId] = useState();

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    console.log(id)
    setId(id)
  }

  console.log(id);

  const [name, setName] = useState([]);
  const [formData, setFormData] = useState(null)

  const handleSubmit = (event) => {
    // event.preventDefault();
    console.log(formData);
    fetch(`http://localhost:8080/product/list`)
    
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data", data)
        setFormData(data)
        setName(data)
        handleClose();
      })
      .catch((error) => {
        console.error("Error during fetch", error);
      });

  }
  useEffect(() => {
    handleSubmit()
  }, []);

  //filter by name
  const handleChange = (event) => {
    setName(formData.filter(f => f.productname.toLowerCase().includes(event.target.value)))
  };

  const [setDelete, setSelectedDelete] = useState()

  const handleDelete = () => {
    console.log(setDelete)
    fetch(`http://localhost:8080/product/${setDelete}`, { method: 'Delete' })
      .then((res) => {
        if (res.ok) {
          alert("Product deleted successfully.");
        } else {
          console.error("Failed to delete user.");
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  }

  return (
    <div>
      <p>Filter By Product Name : <input type='text'
        onChange={handleChange}
        // className='form-control'
        placeholder='search'
      />
      </p>
      <table class="table table-bordered border-dark">
        <thead>
          <tr class="text-center">
            <th scope="col">ID</th>
            <th scope="col" className='text-nowrap'>Category Name</th>
            <th scope="col">Product Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Image Name</th>
            <th scope="col">Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(formData) && name.map((formData) => (
            <tr key={formData.id}>
              <td class="table-primary">{formData._id}</td>
              <td class="table-danger">{formData.categoryname}</td>
              <td class="table-success">{formData.productname}</td>
              <td class="table-warning">{formData.description}</td>
              <td class=" text-nowrap table-info"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-rupee" viewBox="0 0 16 16">
                <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
              </svg>{formData.price}</td>
              <td>
                {/* {formData.image} */}
              <img src={`http://localhost:8080/public/data/uploads/${formData.image}`} style={{ height: "70px", width: "80px" }} alt='Image' />
              </td>
              <td class="table-secondary"><button className='m-2' onClick={() => handleShow(formData._id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
              </svg></button>
                <button onClick={() => setSelectedDelete(formData._id)} data-bs-toggle="modal" data-bs-target="#deleteModal">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                  </svg>
                </button>
                <div class="modal fade" id="deleteModal" data-bs-backdrop="static" data-bs-keyboard="false">
                
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        {/* <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5> */}
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                      Are you sure you want to delete this product?
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => handleDelete()}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}

        </tbody>

      </table>

      {/* Edit form */}
      <Offcanvas show={show} onHide={handleClose} placement='end' backdrop={false} scroll={true}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Update Product</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <UpdateProduct id={id} />
        </Offcanvas.Body>
      </Offcanvas>

    </div>
  )
}

export default AvailableProduct
