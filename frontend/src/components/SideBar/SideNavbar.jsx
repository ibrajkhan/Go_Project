import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import "./sideNavbar.css";


function SideNavbar() {
    const history = useHistory()
    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?") === true) {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            history.push("/")
          } 
    }
    return (
        <div className='parent-div'>
            <div onClick={handleLogout} className='nav-home'></div>
            <Link to="/orders"><div className='nav-create'></div></Link>
            <Link to="/create"><div className='nav-show'></div></Link>
        </div>
    );
}
export default SideNavbar;