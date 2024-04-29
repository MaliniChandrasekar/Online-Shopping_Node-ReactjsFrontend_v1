import React from 'react'

const AboutUs = () => {
  return (
    <div>
        <br></br><br></br>
        <div className='container'>
            <div className='row gx-5'>
            <div className='col m-2 text-center' style={{borderRadius : "15px", backgroundColor : "#dcf0fa"}}>
                <br></br>
                <h3>11 Million+</h3>
                <p>Happy Customers</p>
            </div>
            <div className='col m-2 text-center' style={{borderRadius : "15px", backgroundColor : "#dcf0fa"}}>
            <br></br>  <h3>204</h3>
                <p>Creative Home Studios</p>
            </div>
            <div className='col m-2 text-center' style={{borderRadius : "15px", backgroundColor : "#dcf0fa"}}>
            <br></br>   <h3>90K+</h3>
                <p>Products To Choose From</p>
            </div>
            <div className='col m-2 text-center' style={{borderRadius : "15px", backgroundColor : "#dcf0fa"}}>
            <br></br>   <h3>6500+</h3>
                <p>Pincodes</p>
            </div>
            <div className='col m-2 text-center' style={{borderRadius : "15px", backgroundColor : "#dcf0fa"}}>
            <br></br>  <h3>173+</h3>
                <p>Cities</p>
            </div>
            </div>
        </div>
        {/* <div className='text-center' style={{fontSize : '28px', fontWeight : 'bold', color: 'purple'}}><img src='https://www.creativefabrica.com/wp-content/uploads/2023/01/17/1673951341/Home-Word-Art-580x386.jpg' style={{height : "120px", width : "230px"}} /></div>
      <div className='text-center'><img src='./Images/about1.jpg' style={{height : "450px", width : "1200px"}} /></div>  */}
      <br></br>  <br></br>
      {/* <div className='text-center' style={{fontSize : '28px', color: '#84cdee', fontWeight:'bold'}}><font style={{color : "black"}}>A</font>BOUT US</div>
       <br></br> <center>
        <p className='w-75' style={{fontFamily : 'unset', fontSize : '20px',fontWeight: 'bold', color : 'black'}}>
        In 2012, Ambareesh Murty and Ashish Shah pioneered omnichannel retail to launch Creative Home, India’s leading e-commerce marketplace for furniture and home goods.
In the last decade, Creative Home has disrupted the tenets of classical retail by combining an online virtual catalogue, an extensive in-house supply chain, and a large omnichannel footprint covering more than 100 cities in India. Life can be a ‘bed of roses’ (if the bed is from Creative Home).
        </p></center>
        <br></br><br></br> */}
        <div className='container-fluid' style={{backgroundColor : "#edf7fc"}}>
        <div className='container' >
            <br></br>
        <div className='text-center'style={{fontSize : '28px', color: 'black', fontWeight:'bold', fontStyle : "italic"}}><font style={{color : "black"}}>O</font>UR BELIEFS</div>
        <br></br>
        <div className='row'>
            <div className='col'>
                <img src='./Images/be1.jpg' style={{height : "250px", width : "300px", borderRadius : '20px'}} />
               <div  className='p-5'> <h5 style={{color : "#50b8e7"}}>OWN, DON’T RENT</h5>
                <p className='w-75' style={{fontFamily: 'initial', fontSize : '17px'}}>Revolutions are won by true believers. Be inspiring.</p>
            </div></div>
            <div className='col'>
                <img src='./Images/be2.jpg' style={{height : "250px", width : "300px", borderRadius : '20px'}} />
                <div  className='p-5'>  <h5 style={{color : "#50b8e7"}}>MAKE MAGIC</h5>
                <p className='w-75' style={{fontFamily: 'initial', fontSize : '17px'}}>Find the gap between perception and reality.</p>
            </div></div>
            <div className='col'>
                <img src='./Images/be3.jpg' style={{height : "250px", width : "300px", borderRadius : '20px'}} />
                <div  className='p-5'>   <h5 style={{color : "#50b8e7"}}>HUSTLE</h5>
                <p className='w-75' style={{fontFamily: 'initial', fontSize : '17px'}}>Get more done with less. Work longer, harder and smarter.</p>
            </div></div>
        </div>
        </div>
        <br></br>
        </div>

    </div>
  )
}

export default AboutUs
