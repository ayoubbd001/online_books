import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavHeader from "./components/NavHeader";
import Home from "./pages/Home";
import Client from "./pages/Client";
import Emprunt from "./pages/Emprunt";
import Livre from "./pages/Livre";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import MainHeader from "./components/MainHeader";
import Login from "./pages/Login";
import Alert from "./components/Alert";
import ClientEmp from "./pages/ClientEmp";

export default function App() {
  return (
    <div className="app_box">
      <Router>
        <div className="side d-flex flex-column gap-5">
          <NavHeader />
          <NavBar />
        </div>
        <div className="main">
          <MainHeader />
          <div className="app-content py-2">
            <div className="main-body px-5 py-2">
              <Alert />
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/clients" element={<Client />}></Route>
                <Route path="/emprunts" element={<Emprunt />}></Route>
                <Route path="/livres" element={<Livre />}></Route>
                {/* <Route path="/login" element={<Login />}></Route> */}
                <Route
                  path="/client/emprunts/:id"
                  element={<ClientEmp />}
                ></Route>
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    </div>
  );
}
