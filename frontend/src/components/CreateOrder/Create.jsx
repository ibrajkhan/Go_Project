import React, { useState } from "react";

import Search from "../Search/Search";
import Table from "../CreateTable/Table";
import Header from "../Header/Header";
import Footer from "../Footer/footer";
import SideNavbar from "../SideBar/SideNavbar";

import "../../App.css";
import "../PastOrders/pastOrder.css";
import "./create.css";

function Create() {
  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="sidebar__create">
        <SideNavbar />
      </div>
      <div className="createOrder">
        <div className="past__orders container">
          <div className="orderpage__heading">
            <div className="order__count">
              <label>Create Order</label>
            </div>
            <div className="search">
              <Search></Search>
            </div>
          </div>
          <div className="table">
            <Table />
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Create;
