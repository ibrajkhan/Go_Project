import React, { useState } from "react";
import ButtonOrder from "../Button for orders pages/ButtonOrder";
import SummaryToCreate from "../SummmaryCreateOrderPage/SummaryToCreate";

import OrderConfirm from "../OrderConfirmation/OrderConfirm";
import "./table.css";

import shirt from "../../images/shirt.jpg";
import tshirt from "../../images/tshirt.jpg";
import jeans from "../../images/jeans.jpg";
import trousers from "../../images/trousers.jpg";
import boxers from "../../images/boxers.jpg";
import others from "../../images/others.jpg";
import joggers from "../../images/joggers.jpg";

export default function Table() {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [order, setOrder] = useState({
    status: "",
    products: [],
    totalPrice: 0,
    totalQuantity: 0,
  });
  const status = [
    "Ready to Pickup",
    "Picked up",
    "In Washing",
    "Washed",
    "In Ironing",
    "Ironed",
    "in Delivery",
    "Delivered",
  ];

  const toggleSummaryPopup = () => {
    setIsSummaryOpen(!isSummaryOpen);
  };

  const toggleConfirmationPopup = () => {
    setIsConfirmationOpen(!isConfirmationOpen);
  };

  const price = {
    shirt: 659,
    tshirt: 499,
    trousers: 559,
    jeans: 1199,
    boxers: 399,
    joggers: 999,
    others: 99,
  };
  const [quantity, setQuantity] = useState({
    shirt: 0,
    tshirt: 0,
    trousers: 0,
    jeans: 0,
    boxers: 0,
    joggers: 0,
    others: 0,
  });
  var name, value, prev;
  const Value = (e) => {
    name = e.target.name;
    value = e.target.value;
    setQuantity({ ...quantity, [name]: Number(value) + 1 });
  };

  const Reset = (e) => {
    name = e.target.name;
    setQuantity({ ...quantity, [name]: 0 });
  };

  const Total = (e) => {
    value = e.target.parentElement.value;
    name = e.target.parentElement.name;
    prev = price[name];
  };
  // console.log(wash);

  const handleProceedClick = () => {
    const random = Math.floor(Math.random() * status.length);
    const totalPrice =
      price.shirt * quantity.shirt +
      price.tshirt * quantity.tshirt +
      price.trousers * quantity.trousers +
      price.jeans * quantity.jeans +
      price.boxers * quantity.boxers +
      price.joggers * quantity.joggers +
      price.others * quantity.others;
    const totalQuantity =
      quantity.shirt +
      quantity.tshirt +
      quantity.trousers +
      quantity.jeans +
      quantity.boxers +
      quantity.joggers +
      quantity.others;
    const products = [];
    for (let x in quantity) {
      let product_obj = {};
      if (quantity[x] > 0) {
        product_obj["productType"] = x;
        product_obj["quantity"] = quantity[x];
        products.push(product_obj);
      }
    }
    console.log(products);
    const finalOrder = {
      status: "Ready to Pickup",
      totalPrice: totalPrice,
      totalQuantity: totalQuantity,
      products: products,
    };
    setOrder(finalOrder);
    toggleSummaryPopup();
  };

  return (
    <div>
      <div className="create__container">
        <table className="create__table">
          <thead>
            <tr>
              <th>Product Type</th>
              <th>Quantity</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="title">
                  <img className="product__img" src={shirt} alt="shirt" />
                  <div className="product__about">
                    <p className="product__title">Shirt</p>
                    <p className="product__subtitle">
                      Lorem Ipsum is simply dummy text of the
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <button
                  className="quantity__button"
                  name="shirt"
                  value={quantity.shirt}
                  onClick={Value}
                >
                  {quantity.shirt}
                </button>
              </td>
              <td>
                {price.shirt * quantity.shirt > 0 && (
                  <div>
                    {" "}
                    <span className="price__calculation">
                      {price.shirt} x {quantity.shirt} ={" "}
                    </span>
                    <span className="total__price">
                      {price.shirt * quantity.shirt}
                    </span>
                  </div>
                )}
              </td>
              <td>
                {quantity.shirt > 0 && (
                  <button
                    name="shirt"
                    id="0"
                    onClick={Reset}
                    className="reset__button"
                  >
                    Reset
                  </button>
                )}
              </td>
            </tr>
            <tr>
              <td>
                <div className="title">
                  <img className="product__img" src={tshirt} alt="tshirt" />
                  <div className="product__about">
                    <p className="product__title">T-Shirt</p>
                    <p className="product__subtitle">
                      Lorem Ipsum is simply dummy text of the
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <button
                  className="quantity__button"
                  name="tshirt"
                  value={quantity.tshirt}
                  onClick={Value}
                >
                  {quantity.tshirt}
                </button>
              </td>
              <td>
                {price.tshirt * quantity.tshirt > 0 && (
                  <div>
                    {" "}
                    <span className="price__calculation">
                      {price.tshirt} x {quantity.tshirt} ={" "}
                    </span>
                    <span className="total__price">
                      {price.tshirt * quantity.tshirt}
                    </span>
                  </div>
                )}
              </td>
              <td>
                {quantity.tshirt > 0 && (
                  <button
                    name="tshirt"
                    id="4"
                    onClick={Reset}
                    className="reset__button"
                  >
                    Reset
                  </button>
                )}
              </td>
            </tr>
            <tr>
              <td>
                <div className="title">
                  <img className="product__img" src={trousers} alt="trousers" />
                  <div className="product__about">
                    <p className="product__title">Trousers</p>
                    <p className="product__subtitle">
                      Lorem Ipsum is simply dummy text of the
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <button
                  className="quantity__button"
                  name="trousers"
                  value={quantity.trousers}
                  onClick={Value}
                >
                  {quantity.trousers}
                </button>
              </td>
              <td>
                {price.trousers * quantity.trousers > 0 && (
                  <div>
                    {" "}
                    <span className="price__calculation">
                      {price.trousers} x {quantity.trousers} ={" "}
                    </span>
                    <span className="total__price">
                      {price.trousers * quantity.trousers}
                    </span>
                  </div>
                )}
              </td>
              <td>
                {quantity.trousers > 0 && (
                  <button
                    name="trousers"
                    id="8"
                    onClick={Reset}
                    className="reset__button"
                  >
                    Reset
                  </button>
                )}
              </td>
            </tr>
            <tr>
              <td>
                <div className="title">
                  <img className="product__img" src={jeans} alt="jeans" />
                  <div className="product__about">
                    <p className="product__title">Jeans</p>
                    <p className="product__subtitle">
                      Lorem Ipsum is simply dummy text of the
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <button
                  className="quantity__button"
                  name="jeans"
                  value={quantity.jeans}
                  onClick={Value}
                >
                  {quantity.jeans}
                </button>
              </td>
              <td>
                {price.jeans * quantity.jeans > 0 && (
                  <div>
                    {" "}
                    <span className="price__calculation">
                      {price.jeans} x {quantity.jeans} ={" "}
                    </span>
                    <span className="total__price">
                      {price.jeans * quantity.jeans}
                    </span>
                  </div>
                )}
              </td>
              <td>
                {quantity.jeans > 0 && (
                  <button
                    name="jeans"
                    id="12"
                    onClick={Reset}
                    className="reset__button"
                  >
                    Reset
                  </button>
                )}
              </td>
            </tr>
            <tr>
              <td>
                <div className="title">
                  <img className="product__img" src={boxers} alt="boxers" />
                  <div className="product__about">
                    <p className="product__title">Boxers</p>
                    <p className="product__subtitle">
                      Lorem Ipsum is simply dummy text of the
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <button
                  className="quantity__button"
                  name="boxers"
                  value={quantity.boxers}
                  onClick={Value}
                >
                  {quantity.boxers}
                </button>
              </td>
              <td>
                {price.boxers * quantity.boxers > 0 && (
                  <div>
                    {" "}
                    <span className="price__calculation">
                      {price.boxers} x {quantity.boxers} ={" "}
                    </span>
                    <span className="total__price">
                      {price.boxers * quantity.boxers}
                    </span>
                  </div>
                )}
              </td>
              <td>
                {quantity.boxers > 0 && (
                  <button
                    name="boxers"
                    id="17"
                    onClick={Reset}
                    className="reset__button"
                  >
                    Reset
                  </button>
                )}
              </td>
            </tr>
            <tr>
              <td>
                <div className="title">
                  <img className="product__img" src={joggers} alt="joggers" />
                  <div className="product__about">
                    <p className="product__title">Joggers</p>
                    <p className="product__subtitle">
                      Lorem Ipsum is simply dummy text of the
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <button
                  className="quantity__button"
                  name="joggers"
                  value={quantity.joggers}
                  onClick={Value}
                >
                  {quantity.joggers}
                </button>
              </td>
              <td>
                {price.joggers * quantity.joggers > 0 && (
                  <div>
                    {" "}
                    <span className="price__calculation">
                      {price.joggers} x {quantity.joggers} ={" "}
                    </span>
                    <span className="total__price">
                      {price.joggers * quantity.joggers}
                    </span>
                  </div>
                )}
              </td>
              <td>
                {quantity.joggers > 0 && (
                  <button
                    name="joggers"
                    id="20"
                    onClick={Reset}
                    className="reset__button"
                  >
                    Reset
                  </button>
                )}
              </td>
            </tr>
            <tr>
              <td>
                <div className="title">
                  <img className="product__img" src={others} alt="others" />
                  <div className="product__about">
                    <p className="product__title">Others</p>
                    <p className="product__subtitle">
                      Lorem Ipsum is simply dummy text of the
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <button
                  className="quantity__button"
                  name="others"
                  value={quantity.others}
                  onClick={Value}
                >
                  {quantity.others}
                </button>
              </td>
              <td>
                {price.others * quantity.others > 0 && (
                  <div>
                    {" "}
                    <span className="price__calculation">
                      {price.others} x {quantity.others} ={" "}
                    </span>
                    <span className="total__price">
                      {price.others * quantity.others}
                    </span>
                  </div>
                )}
              </td>
              <td>
                {quantity.others > 0 && (
                  <button
                    name="others"
                    id="24"
                    onClick={Reset}
                    className="reset__button"
                  >
                    Reset
                  </button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="create__buttons">
          <ButtonOrder
            bg="white"
            color="#5861AE"
            content="cancel"
          ></ButtonOrder>
          <div onClick={handleProceedClick}>
            <ButtonOrder
              bg="#5861AE"
              color="white"
              content="proceed"
            ></ButtonOrder>
          </div>
          {isSummaryOpen && (
            <SummaryToCreate
              order={order}
              handleConfirmationPopup={toggleConfirmationPopup}
              handleSummaryClose={toggleSummaryPopup}
            />
          )}
          {isConfirmationOpen && (
            <OrderConfirm handleConfirmationPopup={toggleConfirmationPopup} />
          )}
        </div>
      </div>
    </div>
  );
}
