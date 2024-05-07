import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import Add from "../components/EmpruntModal/Add";
import EmpRow from "../components/EmpRow";
import { getEmprunts } from "../store/empruntSlice";

export default function Emprunt() {
  const listEmp = useSelector((state) => state.emprunts.empruntsList);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmprunts());
  }, []);

  return (
    <div className="px-5 py-2">
      <div className="controle d-flex justify-content-between align-items-center mb-3">
        <div className="title">Emprunts List</div>
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

      <div className="emps_list">
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
                    <p className="list-item-heading mb-1 truncate">Livre</p>
                  </a>

                  <p className="mb-1 text-muted text-small w-15 w-sm-100">
                    client
                  </p>
                  <div className="w-15 w-sm-100">
                    <p className="mb-1 text-muted text-small w-15 w-sm-100">
                      status
                    </p>
                  </div>

                  <p className="mb-1 text-muted text-small w-15 w-sm-100">
                    Action
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {listEmp.length !== 0 ? (
          listEmp.map((empp, i) => <EmpRow key={i} emp={empp} />)
        ) : (
          <p className="text-danger">No Emprunts Registered</p>
        )}
      </div>

      <Add isShow={showModal} setIsShow={setShowModal} />
    </div>
  );
}
