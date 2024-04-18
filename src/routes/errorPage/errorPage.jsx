import { NavLink } from "react-router-dom";
import React from "react";
import "./errorpage.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

export default function ErrorPage() {
  return (
    <>
      <Header />
      <div className="mainContent">
        <div className="errorContainer">
          <NavLink to="/" className="errorLink">
            Go back home
          </NavLink>
        </div>
      </div>
      <Footer />
    </>
  );
}
