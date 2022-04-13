import React from "react";
import "../Header/header.css";

function Header2() {
  return (
    <div className="header">
      {console.log("header component rendering")}
      <label className="title__header">Shopping Cart</label>
      {/* <nav className='Navbar'>
                <div className='list__item'>
                    Pricing
                </div>
                <div className='list__item'>
                    Career
                </div>
                <div className="user__header list__item" >
                <p>Sign In</p>
                </div>
               
                
            </nav> */}
    </div>
  );
}

export default Header2;
