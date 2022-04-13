import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";
import PastOrders from "./components/PastOrders/PastOrders";
import Create from "./components/CreateOrder/Create.jsx";
import Register from "./components/Register/register.jsx";
import Signin from "./components/Signin/Signin.jsx";
import PrivateRoute from "./routes/PrivateRoute";
import NoFoundComponent from "./components/NoPageFound/NoFoundComponent";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/">
          <Signin />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>

        <PrivateRoute exact path="/create">
          <Create />
        </PrivateRoute>

        <PrivateRoute exact path="/orders">
          <PastOrders />
        </PrivateRoute>
      </div>
    </Router>
  );
}

export default App;
