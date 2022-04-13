import React from 'react'
import { Link } from "react-router-dom"

import ButtonOrder from '../Button for orders pages/ButtonOrder'
import Search from '../Search/Search'

import "../PastOrders/pastOrder.css"

function NoOrders() {

    return (
        <div className='past__orders container'>
            <div className="orderpage__heading">
                <div className='order__count'>
                    <label>Orders | 0</label>
                </div>
                <div className = "search">
                    <Search></Search>
                </div>
                
            </div>
            <div className='no__orders'>
            {console.log("no orders component rendering")}
                <p>No Orders available</p>
                <Link to="/create">
                <ButtonOrder bg = "whitesmoke" color ="#5861AE" content="Create"/>
            </Link>
                
                </div>
            </div>
        
    )
}

export default React.memo(NoOrders)