import React, { useEffect, useState } from "react";
import ClientRow from "../components/ClientRow";
import AddClient from "../components/clientModals/AddClient";
import SearchBar from "../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { getClients } from "../store/clientSlice";

export default function Client() {
  const [showModal, setShowModal] = useState(false);

  const clientsList = useSelector((state) => state.clients.clientsList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClients());
  }, []);

  return (
    <div className="px-5 py-2">
      <div className="controle d-flex justify-content-between align-items-center mb-3">
        <div className="title">Clients List</div>
        <div className="controll-btn d-flex align-items-center">
          <div className="group-form me-3">
            <SearchBar slc={"clients"} />
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
        <div className="mb-3 col-12">
          <div className="react-contextmenu-wrapper">
            <div className="d-flex flex-row card px-3">
              <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                  <a
                    aria-current="page"
                    className="w-40 w-sm-100 active"
                    href=""
                  >
                    <p className="list-item-heading mb-1 truncate">firstname</p>
                  </a>

                  <p className="mb-1 text-muted text-small w-15 w-sm-100">
                    lastname
                  </p>
                  <div className="w-15 w-sm-100">
                    <p className="mb-1 text-muted text-small w-15 w-sm-100">
                      email
                    </p>
                  </div>
                  <p className="mb-1 text-muted text-small w-15 w-sm-100">
                    phone
                  </p>
                  <p className="mb-1 text-muted text-small w-15 w-sm-100">
                    Action
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {clientsList.map((cls, i) => (
          <ClientRow client={cls} key={i} />
        ))}
      </div>

      <AddClient isShow={showModal} setIsShow={setShowModal} />
    </div>
  );
}
