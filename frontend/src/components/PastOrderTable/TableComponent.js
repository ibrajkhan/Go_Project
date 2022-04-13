import React, { useState } from 'react'

import Alert from '../Alert/Alert';
import Summary from '../SummaryPastOrderPage/Summary';

import "./pastorderTable.css"

import eye from "../../images/eye.png"


function TableComponent(props) {
    const [alertIsOpen, setAlertIsOpen] = useState(false);
    const [summaryIsOpen, setSummaryIsOpen] = useState(false);
    const [currOrder, setCurrOrder] = useState({})
    const [orderNo, setOrderNo] = useState(null)

    // console.log("alertisOpen:",alertIsOpen);
    // console.log("summaryisOpen:",summaryIsOpen);
    const toggleAlertPopup = () => {
        console.log("cancel order button clicked");
        setAlertIsOpen(!alertIsOpen)
    }
    console.log(props.orders)
    const alertCancel = (ord, id) => {
        setCurrOrder(ord)
        setOrderNo(id+1)
        toggleAlertPopup()
    }

    const viewSummary = (ord) => {
        setCurrOrder(ord)
        toggleSummaryPopup()

    }
    const toggleSummaryPopup = () => {
        // console.log("view button clicked");
        setSummaryIsOpen(!summaryIsOpen)
    }

    const table_headings = ["Order id", "Order Date & Time", "Store Location", "City", "Store Phone", "Total Items", "Price", "Status", "            ", "View"]
    return (

        <div>

            <table className='orders__table'>
                <thead>
                    <tr >
                        {table_headings.map((heading, index) => {
                            return (
                                <th key={index}>{heading}</th>
                            )

                        })}
                    </tr>
                </thead>
                <tbody className='table_body'>
                    {console.log("table component rendering")}
                    {props.orders.map((order, index) => {
                        let bacc = "#f4f5f7"
                        if (index % 2) {
                            bacc = "#0000"
                        }
                        let cancel = false
                        if (order.status === "Ready to Pickup") {
                            cancel = true
                        }

                        let statusStyle = {
                            color: "black",
                            fontWeight: "normal"
                        }
                        if (order.status === "Cancelled") {
                            statusStyle = {
                                color: "red",
                                fontWeight: "bold"
                            }
                        }
                        return (

                            <tr key={order._id} style={{ backgroundColor: bacc }}>
                                <td onClick={() => viewSummary(order)}>
                                    OR000{index + 1}
                                </td>
                                <td onClick={() => viewSummary(order)}>
                                    {Date().slice(3, 21)}
                                </td>
                                <td onClick={() => viewSummary(order)}>
                                    Jp Nagar
                                </td>
                                <td onClick={() => viewSummary(order)}>
                                    Bangalore
                                </td>
                                <td onClick={() => viewSummary(order)}>
                                    +91 99 88 66 77 55
                                </td>
                                <td onClick={() => viewSummary(order)}>
                                    {order.totalQuantity}
                                </td>
                                <td onClick={() => viewSummary(order)} className='price'>
                                    {order.totalPrice + 90} Rs
                                </td>
                                <td onClick={() => viewSummary(order)} style={statusStyle}>
                                    {order.status}
                                </td>
                                <td>
                                    {cancel &&
                                        <button onClick={() => alertCancel(order, index)} className='table__button cancel'>Cancel Order</button>}
                                </td>
                                <td onClick={() => viewSummary(order)}>
                                    <img className="view" src={eye} alt='view' />
                                </td>
                                {alertIsOpen && <Alert
                                    handleClose={toggleAlertPopup}
                                    content={orderNo}
                                    id={order.id}
                                />}
                                {summaryIsOpen && <Summary
                                    handleSummaryClose={toggleSummaryPopup}
                                    handleAlertClose={toggleAlertPopup}
                                    order={currOrder}
                                />}
                            </tr>


                        )


                    })}
                </tbody>
            </table>
        </div>
    )
}

export default React.memo(TableComponent) 