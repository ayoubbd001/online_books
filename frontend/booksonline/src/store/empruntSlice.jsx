import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { showAlertAsync } from "./alertSlice";

export const getEmprunts = createAsyncThunk(
  "emprunts/getEmprunts",
  async () => {
    const res = await axios.get(`http://localhost:3006/api/v1/emprunts`, {
      headers: {
        "Cache-Control": "max-age=3600",
      },
    });
    return res.data.emprunts;
  }
);

export const markEmpruntReturned = createAsyncThunk(
  "emprunts/markReturned",
  async (empruntId, { dispatch, getState }) => {
    try {
      const res = await axios.put(
        `http://localhost:3006/api/v1/emprunt/return/${empruntId}`
      );

      if (res.status !== 500) {
        if (res.data.isSuccess) {
          dispatch(showAlertAsync({ message: res.data.msg, type: "success" }));
          return empruntId;
        } else {
          dispatch(showAlertAsync({ message: res.data.msg, type: "danger" }));
        }
      }
    } catch (e) {
      dispatch(
        showAlertAsync({
          message: "An error occurred, please try again",
          type: "info",
        })
      );
    }
  }
);

export const addEmprunt = createAsyncThunk(
  "emprunts/add",
  async (params, { dispatch, getState }) => {
    const emprunt = params;
    try {
      const res = await axios.post(
        "http://localhost:3006/api/v1/emprunts/create",
        emprunt
      );
      if (!res.data.isSuccess) {
        dispatch(showAlertAsync({ message: res.data.msg, type: "danger" }));
        return null;
      } else {
        dispatch(showAlertAsync({ message: res.data.msg, type: "success" }));
        return res.data.emprunt;
      }
    } catch (error) {
      dispatch(
        showAlertAsync({
          message: "An error occurred, please try again",
          type: "info",
        })
      );
    }
  }
);

export const deleteEmprunt = createAsyncThunk(
  "emprunts/delete",
  async (empruntId, { dispatch, getState }) => {
    try {
      const res = await axios.delete(
        `http://localhost:3006/api/v1/emprunts/${empruntId}`
      );

      if (res.status !== 500) {
        if (res.data.isSuccess) {
          dispatch(
            showAlertAsync({ message: res.data.message, type: "success" })
          );
          return empruntId;
        } else {
          dispatch(
            showAlertAsync({ message: res.data.message, type: "danger" })
          );
        }
      }
    } catch (e) {
      dispatch(
        showAlertAsync({
          message: "An error occurred, please try again",
          type: "info",
        })
      );
    }
  }
);

const empruntSlice = createSlice({
  name: "emprunts",
  initialState: {
    loading: false,
    empruntsList: [],
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmprunts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getEmprunts.fulfilled, (state, action) => {
        state.empruntsList = action.payload;
        state.loading = false;
      })
      .addCase(getEmprunts.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to fetch emprunts list";
      })
      .addCase(addEmprunt.fulfilled, (state, action) => {
        console.log(action.payload);
        state.empruntsList.push(action.payload);
      })
      .addCase(deleteEmprunt.fulfilled, (state, action) => {
        state.empruntsList = state.empruntsList.filter(
          (emprunt) => emprunt._id !== action.payload
        );
      })
      .addCase(markEmpruntReturned.fulfilled, (state, action) => {
        const empruntId = action.payload;
        const updatedEmpruntsList = state.empruntsList.map((emprunt) => {
          if (emprunt._id === empruntId) {
            emprunt.dateRetour = new Date();
          }
          return emprunt;
        });
        state.empruntsList = updatedEmpruntsList;
      });
  },
});

export default empruntSlice.reducer;
