import React from "react";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClientCount,
  fetchEmpruntCount,
  fetchLivreCount,
  selectClientCount,
  selectEmpruntCount,
  selectLivreCount,
} from "../store/homeSlice";

import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch();

  // Fetch the counts of each model
  useEffect(() => {
    dispatch(fetchClientCount());
    dispatch(fetchEmpruntCount());
    dispatch(fetchLivreCount());
  }, [dispatch]);

  const clientCount = useSelector(selectClientCount);
  const empruntCount = useSelector(selectEmpruntCount);
  const livreCount = useSelector(selectLivreCount);
  return (
    <div className="container mt-5" id="home">
      <div className="row">
        <div className="col-sm-4">
          <Card title="client count" count={clientCount} link={"/clients"} />
        </div>
        <div className="col-sm-4">
          <Card title="livres count" count={livreCount} link={"/livres"} />
        </div>
        <div className="col-sm-4">
          <Card
            title="emprunts count"
            count={empruntCount}
            link={"/emprunts"}
          />
        </div>
      </div>
    </div>
  );
}
