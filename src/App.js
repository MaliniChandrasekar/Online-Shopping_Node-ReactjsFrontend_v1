import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {AddProduct} from './Components/AddProduct'
import Home from './Components/Home';
import AddCategory from './Components/AddCategory';
import User from './Components/User';
import Admin1 from './Components/Admin1';
import UpdateProduct from './Components/UpdateProduct';
import Furniture from './Components/Furniture';
import SofaSeating from './Components/SofaSeating';
import HomeDecor from './Components/HomeDecor';
import Kitchen from './Components/Kitchen';
import AddtoCart from './Components/AddtoCart';
import Audio  from './Components/Audio';
import Payment from './Components/Payment';
import AboutUs from './Components/AboutUs';
import Footer from './Components/Footer';
import WishList from './Components/WishList';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
      <Routes>
      <Route path="/login/:price" element = {<Login />}></Route>
      <Route path="/signup/:price" element = {<SignUp />}></Route>
      <Route path="/addproduct" element={<AddProduct />}></Route>
      <Route path="/home1" element={<Home />}></Route>
      <Route path="/addcategory" element={<AddCategory />}></Route>
      <Route path="/user" element={<User />}></Route>
      <Route path ="/admin/:firstname" element= {<Admin1 />}></Route>
      <Route path ="/update" element= {<UpdateProduct />}></Route>
      <Route path= "/furniture/:category" element = {<Furniture />}></Route>
      <Route path= "/sofa/:category" element = {<SofaSeating />}></Route>
      <Route path= "/home/:category" element = {<HomeDecor />}></Route>
      <Route path= "/kitchen/:category" element = {<Kitchen />}></Route>
      <Route path= "/cart" element = {<AddtoCart />}></Route>
      <Route path = "/audio" element = {<Audio />}></Route>
      <Route path = "/payment/:price" element ={<Payment />}></Route>
      <Route path = "/about" element = {<AboutUs />}></Route>
      <Route path = "/footer" element = {<Footer />}></Route>
      <Route path = "/wish" element = {<WishList />} />
     </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
