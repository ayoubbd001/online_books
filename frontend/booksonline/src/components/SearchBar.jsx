import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { showAlertAsync } from "../store/alertSlice";

export default function SearchBar({ setList, slc }) {
  const [query, setQuery] = useState("");
  let url;
  switch (slc) {
    case "clients":
      url = "http://localhost:3005/api/v1/clients/search";
      break;

    case "livres":
      url = "http://localhost:3001/api/v1/livres/search";

      break;
    case "emprunts":
      url = "http://localhost:3006/api/v1/emprunts/search";
      break;

    default:
      break;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(url, {
        params: { query: query },
      });

      console.log("Search results:", response.data);
      setList(response.data);
    } catch (error) {
      showAlertAsync({
        message: "no search for this result",
        type: "info",
      });
      console.error("Error searching clients:", error);
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <button>
        <svg
          width="17"
          height="16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-labelledby="search"
        >
          <path
            d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
            stroke="currentColor"
            strokeWidth="1.333"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
      <input
        className="input"
        placeholder="Serach by Name"
        required=""
        type="text"
        name="searchq"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="reset" type="reset">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </form>
  );
}
