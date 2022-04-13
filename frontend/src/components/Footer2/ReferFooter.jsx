import React from 'react'
import './ReferFooter.css'

import Facebook from '../../images/facebook.svg'
import Instagram from '../../images/instagram.svg'
import LinkedIn from '../../images/linkedin.svg'

export default function ReferFooter(){
    return(
        <footer className='footer__main'>
            {console.log("footer component rendering")}
            <div className='refer_and_earn'>
                <h3>Now Refer & Earn ₹500 for every referral* </h3>
                <span>* Terms and conditions will be applied</span>
            </div>
            <div className='refer_about'>
                <div className='refer_about_first'>
                    <h4>About Us</h4>
                    <p>Doorstep Service</p>
                </div>
                <div className='refer_about_second'>
                    <div>
                        <h4>Home</h4>
                        <p>Sign In</p>
                        <p>Register</p>
                    </div>
                    <div>
                        <h4>Pricing</h4>
                    </div>
                    <div>
                        <h4>Career</h4>
                        <p>Blogs</p>
                        <p>Create</p>
                    </div>
                    <div>
                        <h4>Contact</h4>
                    </div>
                </div>
                <div className='refer_about_third'>
                    <h3>Social Media</h3>
                    <div className='social_media'>
                        <img src={Facebook} alt='facebook'></img>
                        <img src={Instagram} alt='instagram'></img>
                        <img src={LinkedIn} alt='linkedin'></img>
                    </div>
                </div>
            </div>
        </footer>
    )
}