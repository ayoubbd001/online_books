import React, { useState } from "react";
import ClientRow from "../components/ClientRow";
import AddClient from "../components/clientModals/AddClient";
import SearchBar from "../components/SearchBar";

export default function Client() {
  const [showModal, setShowModal] = useState(false);

  const clientPlaceholderList = Array.from(
    { length: 20 },
    (_, index) => index + 1
  );
  return (
    <div className="px-5 py-2">
      <div className="controle d-flex justify-content-between align-items-center mb-3">
        <div className="title">Clients List</div>
        <div className="controll-btn d-flex align-items-center">
          <div className="group-form me-3">
            <SearchBar />
          </div>
          <button
            className="btn btn-secondary"
            id="add_client_btn"
            onClick={() => setShowModal(true)}
          >
            ADD NEW
          </button>
        </div>
      </div>

      <div className="client_list">
        {clientPlaceholderList.map((cls, i) => (
          <ClientRow key={i} />
        ))}
      </div>

      <AddClient isShow={showModal} setIsShow={setShowModal} />
    </div>
  );
}
