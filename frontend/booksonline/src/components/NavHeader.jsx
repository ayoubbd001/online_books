import React from "react";
import appLogo from "../assets/book_logo.jpg";

export default function NavHeader() {
  return (
    <div className="nav_header">
      <div className="logo text-center p-2">
        <img
          src={appLogo}
          alt=""
          className="img-fluid"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
}
