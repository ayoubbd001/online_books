import React from "react";
import { useParams } from "react-router-dom";

export default function ClientEmp() {
  const { idCl } = useParams();

  const fetchEmp = (id) => {};
  return (
    <div className="container">
      <div className="row">
        <h4></h4>
      </div>
    </div>
  );
}
