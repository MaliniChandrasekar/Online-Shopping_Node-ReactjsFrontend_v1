import React from 'react'
import { useState, useEffect } from 'react'
import { AddProduct } from './AddProduct'
import { Link } from 'react-router-dom'
import AvailableProduct from './AvailableProduct'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const Admin1 = () => {

  const { firstname } = useParams();
  const [name, setName] = useState([]);
  const [formData, setFormData] = useState(null)
  const [customData, setCustomer] = useState(null)
  const navigate = useNavigate()

  //Add a user
  const [FormData, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    // Add address fields to the form state
    doorno: "",
    street: "",
    city: "",
    state: "",
    pincode: ""
  })
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...FormData, [name]: value })
    console.log(name, value);
  }
  const handleSubmit = (event) => {
    // event.preventDefault();
    console.log(FormData);

    if (!FormData.firstname || !FormData.lastname || !FormData.city || !FormData.doorno || !FormData.street || !FormData.city || !FormData.state || !FormData.pincode) {
      alert("Please fill in all required fields");
    } else if (!isValidEmail(FormData.email)) {
      alert("Please enter a valid email address");
    } else if (FormData.password.length < 5) {
      alert("Password must be at least 5 characters long");
    } else {
      // Form data is valid, check if email already exists
      fetch(`http://localhost:8080/user/checkEmail/${FormData.email}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to check email");
          }
          return response.json();
        })
        .then((data) => {
          if (data.exists) {
            alert("Email already exists. Please use a different email address.");
          } else {
            // Email is not in the database, proceed with signup
            const SignUp = {
              firstname: FormData.firstname,
              lastname: FormData.lastname,
              email: FormData.email,
              password: FormData.password,
              addressData: {
                doorno: FormData.doorno,
                street: FormData.street,
                city: FormData.city,
                state: FormData.state,
                pincode: FormData.pincode
              }
            };

            // Send signup data to the backend
            fetch("http://localhost:8080/user/insert", {
              headers: {
                "Content-Type": "application/json"
              },
              method: 'post',
              body: JSON.stringify(SignUp)
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Failed to register user");
                }
                console.log("Data received ", response);
                alert("New User added..!");

                window.location.reload();
              })
              .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred while registering");
              });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred while checking email");
        });
    }
  }

  //Get User
  const customer = () => {
    fetch("http://localhost:8080/user/list")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Data", data);
        setCustomer(data);
        setName(data); // Ensure this is the correct way to set the name
      })
      .catch((error) => {
        console.error("Error during fetch", error);
        // Handle the error here, e.g., show a message to the user
      });
  };

  useEffect(() => {
    customer();
  }, []);


  //Delete an user
  const [setDelete, setSelectedDelete] = useState()

  const handleDelete = () => {
    console.log(setDelete)
    fetch(`http://localhost:8080/user/${setDelete}`, { method: 'Delete' })
      .then((res) => {
        if (res.ok) {
          alert("User deleted successfully.");

          window.location.reload();
        } else {
          console.error("Failed to delete user.");
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  }

  //To filter a name
  const handleChange1 = (event) => {
    setName(customData.filter(f => f.firstname.toLowerCase().includes(event.target.value)))
  };


  // To update a user

  const [updateData, setupdateData] = useState({
    firstname: "",
    lastname: "",
    password: "",
    email: "",
    // Add address fields to the form state
    doorno: "",
    street: "",
    city: "",
    state: "",
    pincode: ""
  });

  const handleupdate = (event) => {
    const { name, value } = event.target;
    setupdateData({ ...updateData, [name]: value })
    console.log(name, value);
  }

  const [setUpdate, setSelectedUpdate] = useState();
  console.log("id", setUpdate)
  const updateSubmit = async (event) => {
    // event.preventDefault(); // Prevent the default form submission behavior

    console.log(updateData);

    // Perform validation
    if (!updateData.firstname || !updateData.lastname || !updateData.city || !updateData.doorno || !updateData.street || !updateData.city || !updateData.state || !updateData.pincode) {
      alert("Please fill in all required fields");
      return; // Exit the function if validation fails
    } else if (!isValidEmail(updateData.email)) {
      alert("Please enter a valid email address");
      return; // Exit the function if email is invalid
    } else if (updateData.password.length < 5) {
      alert("Password must be at least 5 characters long");
      return; // Exit the function if password is too short
    }

    // Optional: You can add more specific validation rules here

    // Check if email already exists
    try {
      const emailCheckResponse = await fetch(`http://localhost:8080/user/checkEmail/${updateData.email}`);
      if (!emailCheckResponse.ok) {
        throw new Error("Failed to check email");
      }
      const emailCheckData = await emailCheckResponse.json();
      if (emailCheckData.exists) {
        alert("Email already exists. Please use a different email address.");
        return; // Exit the function if email already exists
      }

      // Email is not in the database, proceed with update
      const update = {
        firstname: updateData.firstname,
        lastname: updateData.lastname,
        email: updateData.email,
        password: updateData.password,
        addressData: {
          doorno: updateData.doorno,
          street: updateData.street,
          city: updateData.city,
          state: updateData.state,
          pincode: updateData.pincode
        }
      };

      const updateResponse = await fetch(`http://localhost:8080/user/${setUpdate}`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: 'PUT',
        body: JSON.stringify(update)
      });

      if (!updateResponse.ok) {
        throw new Error("Failed to update user");
      }

      const data = await updateResponse.text();
      console.log("Data Received: ", data);
      alert("User updated");

      window.location.reload();
    } catch (error) {
      console.error("Error occurred while updating user", error);
      alert("Failed to update user");
    }
  }


  // Helper function to validate email format
  function isValidEmail(email) {
    // Regular expression for basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleLogout = () => {
    // Perform logout logic...
    // setIsLoggedIn(false);
    // Remove user ID from sessionStorage
    sessionStorage.removeItem('userId');
    navigate("/")
  };

  const product = {
    borderRadius: '8px',
    boxShadow: '10px 10px 10px black',
    fontSize: '18px',
    color: '#1f2535',
    fontWeight: 'bold',
    fontStyle: 'italic',
  };
  const product1 = {
    borderRadius: '8px',
    boxShadow: '10px 10px 10px black',
    fontSize: '18px',
    color: '#1f2535',
    fontWeight: 'bold',
    fontStyle: 'italic',
  }

  const m1 = {
    fontWeight: 'bold',
    // fontStyle : 'italic',
    color: '#1F456E',
    fontFamily: 'Montserrat, sans-serif',
    // fontSize : '18px',
  }

  return (
    <div>
      <div>
        <br></br>
        <div className='text-center' style={{ color: 'blue', fontSize: '20px', fontWeight: 'bold', fontStyle: 'italic' }}>Welcome back, {firstname}</div>
      </div>
      <br></br>
      <div class="container">
        <nav class="d-flex justify-content-center">
          <div class="nav nav-tabs mb-3 " id="nav-tab" role="tablist">
            <button class="nav-link active" id="nav-home1-tab" data-bs-toggle="tab" data-bs-target="#nav-home1" type="button" role="tab" aria-controls="nav-home1" aria-selected="true">Dashboard</button>
            <button class="nav-link " id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Users</button>
            <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Product List</button>
            {/* <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Orders</button> */}
            <button class="nav-link" id="nav-connect-tab" data-bs-toggle="tab" data-bs-target="#nav-connect" type="button" role="tab" aria-controls="nav-connect" aria-selected="false">Add a New Product</button>
            <button class="nav-link" id="nav-connect1-tab" data-bs-toggle="tab" data-bs-target="#nav-connect1" type="button" role="tab" aria-controls="nav-connect1" aria-selected="false">Accounts</button>
          </div>
        </nav>
        <div class="tab-content p-3 border bg-light d-flex justify-content-center" id="nav-tabContent">
          <div class="tab-pane fade p-3 active show" id="nav-home1" role="tabpanel" aria-labelledby="nav-home1-tab">

            <table class="table table-primary">
              <tbody>
                <tr>
                  <th scope="row" className='p-4'>Total Orders</th>
                  <th className='p-4'>40,876</th>
                  <td className='p-4'><svg xmlns="http://www.w3.org/2000/svg" className='text-primary' mwidth="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z" />
                  </svg> Up from yesterday</td>
                </tr>
                <tr >
                  <th scope="row" className='p-4'>Total Sales</th>
                  <th className='p-4'>37,897</th>
                  <td className='p-4'><svg xmlns="http://www.w3.org/2000/svg" className='text-primary' width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z" />
                  </svg> Up from yesterday</td>
                </tr>
                <tr>
                  <th scope="row" className='p-4'>Total Profit</th>
                  <th className='p-4'><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-currency-dollar" viewBox="0 0 16 16">
                    <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z" />
                  </svg>10,679</th>
                  <td className='p-4'><svg xmlns="http://www.w3.org/2000/svg" className='text-primary' width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z" />
                  </svg> Up from yesterday</td>
                </tr>
                <tr>
                  <th scope="row" className='p-4'>Total Return</th>
                  <th className='p-4'>8,453</th>
                  <td className='p-4'><svg xmlns="http://www.w3.org/2000/svg" className='text-danger' width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z" />
                  </svg> Down from today</td>
                </tr>
              </tbody>
            </table>

          </div>
          <div class=" tab-pane fade p-3" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            <div className='row'>
              <div className='col'>
                Filter By Firstname : <input type='text'
                  onChange={handleChange1}
                  // className='form-control'
                  placeholder='search'
                /></div>
              <div className='col d-flex justify-content-end'> <button className='d-flex justify-content-end p-2' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                </svg>
              </button>
                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel" style={m1}>Add a new User : </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body text-center">
                        <div className='p-2 m-2'>
                          <p style={m1}>Firstname : <input type='text' placeholder='enter your firstname' name='firstname' value={FormData.firstname} onChange={handleChange} /></p>
                          <p style={m1}>Lastname : <input type='text' placeholder='enter your lastname' name='lastname' value={FormData.lastname} onChange={handleChange} /></p>
                          <p style={m1}>Email : <input type='text' placeholder='enter your mail-id' name='email' value={FormData.email} onChange={handleChange} required /></p>
                          {/* <p>Re-enter Email : <input type='text' placeholder='re-enter your mail-id' required/></p> */}
                          <p style={m1}>Password : <input type='password' placeholder='enter your password' name='password' value={FormData.password} onChange={handleChange} required /></p>
                          <p style={m1}>Door No : <input type='number' placeholder='enter your doorno' name='doorno' value={FormData.doorno} onChange={handleChange} /></p>
                          <p style={m1}>Street : <input type='text' placeholder='enter your street' name='street' value={FormData.street} onChange={handleChange} /></p>
                          <p style={m1}>City : <input type='text' placeholder='enter your city' name='city' value={FormData.city} onChange={handleChange} required /></p>
                          <p style={m1}>State : <input type='text' placeholder='enter your state' name='state' value={FormData.state} onChange={handleChange} /></p>
                          <p style={m1}>Pincode : <input type='number' placeholder='enter your pincode' name='pincode' value={FormData.pincode} onChange={handleChange} /></p>


                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={handleSubmit}>Add</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div><br></br>

            <table class="table table-bordered border-dark table-striped">
              <thead>
                <tr class="text-center">
                  <th scope="col">ID</th>
                  <th scope="col">FirstName</th>
                  <th scope="col">LastName</th>
                  <th scope="col">Email</th>
                  <th scope="col">Password</th>
                  <th scope='col'>Address</th>
                  <th scope='col'>Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(customData) && name.map((customData) => (
                  <tr key={customData._id}>
                    <td >{customData._id}</td>
                    <td >{customData.firstname}</td>
                    <td>{customData.lastname}</td>
                    <td>{customData.email}</td>
                    <td style={{ maxWidth: "150px", wordWrap: "break-word" }}>{customData.password}</td>
                    <td>
                     <div>No {customData.address.doorno}</div> 
                     <div>{customData.address.street}</div> 
                     <div>{customData.address.city}</div>
                     <div>{customData.address.state}</div>
                     <div>{customData.address.pincode}</div>
                      </td>
                    <td><button className='m-2' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" onClick={() => setSelectedUpdate(customData._id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                    </svg></button><button data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setSelectedDelete(customData._id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg></button></td>
                  </tr>
                ))}
              </tbody>

            </table>
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
              <div class="offcanvas-header">
                <h5 id="offcanvasRightLabel" style={m1}>Update an User :</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div class="offcanvas-body">
                <div className='p-2 m-2'>
                  <p style={m1}>User ID : <input type='text' value={setUpdate} /></p>
                  <p style={m1}>Firstname : <input type='text' placeholder='enter your firstname' name='firstname' value={updateData.firstname} onChange={handleupdate} /></p>
                  <p style={m1}>Lastname : <input type='text' placeholder='enter your lastname' name='lastname' value={updateData.lastname} onChange={handleupdate} /></p>
                  <p style={m1}>Email : <input type='text' placeholder='enter your mail-id' name='email' value={updateData.email} onChange={handleupdate} required /></p>
                  {/* <p>Re-enter Email : <input type='text' placeholder='re-enter your mail-id' required/></p> */}
                  <p style={m1}>Password : <input type='password' placeholder='enter your password' name='password' value={updateData.password} onChange={handleupdate} required /></p>
                  {/* <p>Re-enter Password : <input type='password' placeholder='re-enter your password' required/></p> */}
                  {/* <p >Already have an account? : <Link to="/login">Login</Link></p> */}
                  <p style={m1}>Door No : <input type='number' placeholder='enter your doorno' name='doorno' value={updateData.doorno} onChange={handleupdate} /></p>
                  <p style={m1}>Street : <input type='text' placeholder='enter your street' name='street' value={updateData.street} onChange={handleupdate} /></p>
                  <p style={m1}>City : <input type='text' placeholder='enter your city' name='city' value={updateData.city} onChange={handleupdate} required /></p>
                  <p style={m1}>State : <input type='text' placeholder='enter your state' name='state' value={updateData.state} onChange={handleupdate} /></p>
                  <p style={m1}>Pincode : <input type='number' placeholder='enter your pincode' name='pincode' value={updateData.pincode} onChange={handleupdate} /></p>


                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary m-2" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onClick={() => updateSubmit()}>Update</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal fade" id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    {/* <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> */}
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    Are you sure you want to delete this user?
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => handleDelete()}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="tab-pane fade p-3" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
            <AvailableProduct />
          </div>
          {/* <div class="tab-pane fade p-3 border w-50 text-center" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
            
          </div> */}
          <div class="tab-pane fade p-3 border w-50 text-center" id="nav-connect" role="tabpanel" aria-labelledby="nav-connect-tab" style={product}>
            <AddProduct />
          </div>
          <div className="tab-pane fade p-3 border w-50 text-center col-12" id="nav-connect1" role="tabpanel" aria-labelledby="nav-connect1-tab" style={product1}>
            <div >Admin : {firstname}</div><br></br>
            <div className=' m-3' style={{ textDecoration: 'none' }} onClick={handleLogout}><button>Logout</button></div>
          </div>
        </div>

      </div>
    </div>
  )
}


export default Admin1
