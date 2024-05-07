import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showAlertAsync } from "./alertSlice";

export const getLivres = createAsyncThunk("livres/getLivres", async () => {
  const res = await axios.get(`http://localhost:3001/api/v1/livres`, {
    headers: {
      "Cache-Control": "max-age=3600",
    },
  });
  return res.data.livres;
});

export const addLivre = createAsyncThunk(
  "livres/add",
  async (params, { dispatch, getState }) => {
    const lv = params;
    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/livre/create",
        lv
      );
      if (res.data.isSuccess) {
        dispatch(showAlertAsync({ message: res.data.msg, type: "success" }));
        return res.data.livre;
      } else {
        dispatch(showAlertAsync({ message: res.data.msg, type: "danger" }));
        return null;
      }
    } catch (error) {
      dispatch(
        showAlertAsync({ message: "an error occurs try again", type: "info" })
      );
    }
  }
);

export const deleteLivre = createAsyncThunk(
  "livres/delete",
  async (params, { dispatch, getState }) => {
    const livreCode = params;

    try {
      const res = await axios.delete(
        `http://localhost:3001/api/v1/livre/${livreCode}`
      );

      if (res.data.isSuccess) {
        dispatch(showAlertAsync({ message: res.data.msg, type: "success" }));
        return res.data.livre; // Return the deleted livre code
      } else {
        dispatch(showAlertAsync({ message: res.data.msg, type: "danger" }));
      }
    } catch (e) {
      dispatch(
        showAlertAsync({ message: "an error occurs try again !", type: "info" })
      );
    }
  }
);

export const editLivre = createAsyncThunk(
  "livres/edit",
  async (params, { dispatch, getState }) => {
    const data = params;

    try {
      const res = await axios.put(
        `http://localhost:3001/api/v1/livre/${data._id}`,
        data
      );

      if (res.data.isSuccess) {
        dispatch(showAlertAsync({ message: res.data.msg, type: "success" }));
        return res.data.livre;
      } else {
        dispatch(showAlertAsync({ message: res.data.msg, type: "danger" }));
      }
    } catch (e) {
      dispatch(
        showAlertAsync({ message: "an error ocuurs try again !", type: "info" })
      );
    }
  }
);

const LivresSlice = createSlice({
  name: "livres",
  initialState: {
    loading: false,
    livresList: [],
    error: "",
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getLivres.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getLivres.fulfilled, (state, action) => {
        state.loading = false;
        state.livresList = action.payload;
      })
      .addCase(getLivres.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to fetch livre list";
      })
      .addCase(addLivre.fulfilled, (state, action) => {
        if (action.payload !== null) {
          const newLivre = action.payload;
          state.livresList.push(newLivre);
        }
      })
      .addCase(editLivre.fulfilled, (state, action) => {
        const editedLivre = action.payload;
        state.livresList = state.livresList.map((lv) =>
          lv._id === editedLivre._id ? editedLivre : lv
        );
      })
      .addCase(deleteLivre.fulfilled, (state, action) => {
        const deletedLivreCode = action.payload.code;
        state.livresList = state.livresList.filter(
          (lv) => lv.code !== deletedLivreCode
        );
      });
  },
});

export default LivresSlice.reducer;
