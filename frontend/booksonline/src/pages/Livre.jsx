import React from "react";
import { getLivres } from "../store/livreSlice";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BookRow from "../components/BookRow";
import AddLivre from "../components/livreModals/AddLivre";
import SearchBar from "../components/SearchBar";
export default function Livre() {
  const [showModal, setShowModal] = useState(false);

  const livresList = useSelector((state) => state.livres.livresList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLivres());
  }, []);

  // console.log(clientsList);

  // const clientPlaceholderList = Array.from(
  //   { length: 20 },
  //   (_, index) => index + 1
  // );
  return (
    <div className="px-5 py-2">
      <div className="controle d-flex justify-content-between align-items-center mb-3">
        <div className="title">Books List</div>
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

      <div className="livre_list">
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
                    <p className="list-item-heading mb-1 truncate">Code</p>
                  </a>
                  <p className="mb-1 text-muted text-small w-15 w-sm-100">
                    Titre
                  </p>
                  <p className="mb-1 text-muted text-small w-15 w-sm-100"></p>
                  <div className="w-15 w-sm-100">
                    <p className="mb-1 text-muted text-small w-15 w-sm-100">
                      Description
                    </p>
                  </div>
                  <p className="mb-1 text-muted text-small w-15 w-sm-100">
                    Auteur
                  </p>
                  <p className="mb-1 text-muted text-small w-15 w-sm-100">
                    Action
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {livresList.map((lv, i) => (
          <BookRow livre={lv} key={i} />
        ))}
      </div>
      <AddLivre isShow={showModal} setIsShow={setShowModal} />
    </div>
  );
}
