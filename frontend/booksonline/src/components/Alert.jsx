import React, { useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { hideAlert } from "../store/alertSlice";

export default function Alert() {
  const { visible, message, type } = useSelector((state) => state.alert);

  const dispatch = useDispatch();

  console.log(visible);

  const handleClose = () => {
    dispatch(hideAlert());
  };
  return (
    <div
      className={`d-flex justify-content-around align-items-center alert rounded alert-${type} ${
        visible ? "show-alert" : ""
      }`}
    >
      <p className="mb-0">{message}</p>
      <button
        className="btn"
        style={{ border: "none", background: "none" }}
        onClick={handleClose}
      >
        <IoIosClose
          style={{ width: "24px", height: "24px" }}
          className={`cl-type-${type}`}
        />
      </button>
    </div>
  );
}
