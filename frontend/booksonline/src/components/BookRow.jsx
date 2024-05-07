import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RiEdit2Line } from "react-icons/ri";
import EditLivre from "./livreModals/EditLivre";
import DeleteLivre from "./livreModals/DeleteLivre";
import { useState } from "react";

export default function BookRow({ livre }) {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  return (
    <div>
      <div className="mb-3 col-12">
        <div className="react-contextmenu-wrapper">
          <div className="d-flex flex-row card px-3">
            <div className="pl-2 d-flex flex-grow-1 min-width-zero">
              <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                <a
                  aria-current="page"
                  className="w-40 w-sm-100 active"
                  href="/app/pages/product/data-list?p=18"
                >
                  <p className="list-item-heading mb-1 truncate">
                    {livre.code}
                  </p>
                </a>
                <p className="mb-1 text-muted text-small w-15 w-sm-100">
                  {livre.titre}
                </p>
                <p className="mb-1 text-muted text-small w-15 w-sm-100"></p>
                <div className="w-15 w-sm-100">
                  <p className="mb-1 text-muted text-small w-15 w-sm-100">
                    {livre.description}
                  </p>
                </div>
                <p className="mb-1 text-muted text-small w-15 w-sm-100">
                  {livre.auteur}
                </p>
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

      <EditLivre
        isShow={showModalEdit}
        handleShow={setShowModalEdit}
        livre={livre}
      />

      <DeleteLivre
        isShow={showModalDelete}
        handleShow={setShowModalDelete}
        bookTitle={livre.titre}
        bookCode={livre._id}
      />
    </div>
  );
}
