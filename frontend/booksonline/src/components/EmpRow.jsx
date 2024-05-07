import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RiEdit2Line } from "react-icons/ri";
// import EditClient from "./clientModals/EditClient";
// import DeleteClient from "./clientModals/DeleteClient";
import DeleteEmp from "./EmpruntModal/DeleteEmp";
import Edit from "./EmpruntModal/Edit";

export default function EmpRow({ emp }) {
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  return (
    <div>
      <div className="mb-3 col-12">
        <div className="react-contextmenu-wrapper">
          <div className="d-flex flex-row card px-3">
            <div className="pl-2 d-flex flex-grow-1 min-width-zero">
              <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                <a aria-current="page" className="w-40 w-sm-100 active" href="">
                  <p className="list-item-heading mb-1 truncate">
                    {emp.livre.titre}
                  </p>
                </a>
                <p className="mb-1 text-muted text-small w-15 w-sm-100">
                  {emp.client.name}
                </p>
                <p className="mb-1 text-muted text-small w-15 w-sm-100">
                  {emp.dateRetour !== null ? "returned" : "emprunted"}
                </p>
                <div className="w-15 w-sm-100">
                  <p className="mb-1 text-muted text-small w-15 w-sm-100">{}</p>
                </div>
              </div>
              <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                <div className="item-check mb-0 custom-checkbox custom-control">
                  <button
                    className="btn"
                    onClick={() => setShowModalEdit(true)}
                  >
                    <RiEdit2Line />
                  </button>
                  <button
                    className="btn"
                    onClick={() => setShowModalDelete(true)}
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Edit
        isShow={showModalEdit}
        handleShow={setShowModalEdit}
        idEmp={emp._id}
      />

      <DeleteEmp
        isShow={showModalDelete}
        handleShow={setShowModalDelete}
        EmpCode={emp._id}
        EmpTitle={emp.client.name}
      />
    </div>
  );
}
