import React from 'react'
import "./button_orders.css"

function ButtonOrder(props) {
  const buttonstyle = {
    backgroundColor:props.bg,
    color:props.color
  }

  return (
    <div>
    <button className='button__orders' style={buttonstyle}>{props.content}</button>
    </div>
  )
}

export default ButtonOrder