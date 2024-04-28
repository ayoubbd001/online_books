import React from "react";
import { NavLink } from "react-router-dom";
import { PiHeartHalfFill } from "react-icons/pi";
import { GoStarFill } from "react-icons/go";
import { IoHomeSharp } from "react-icons/io5";
import { FaArrowUpRightDots } from "react-icons/fa6";

export default function NavBar() {
  return (
    <aside id="nav-bar" className="d-flex align-items-center">
      <div className="box_nav p-2">
        <div className="nav-bar">
          <ul
            className="nav-iv d-flex flex-column gap-3 p-0"
            style={{ listStyle: "none", width: "100% !important" }}
          >
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                <span>
                  <IoHomeSharp />
                </span>
                <span>Home</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/clients" className="nav-link">
                <span>
                  <GoStarFill />
                </span>
                <span>Clients</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/emprunts" className="nav-link">
                <span>
                  <FaArrowUpRightDots />
                </span>
                <span>Emprunt</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/livres">
                <span>
                  <PiHeartHalfFill />
                </span>
                <span>Livres</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
