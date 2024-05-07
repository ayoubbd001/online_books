import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showAlertAsync } from "./alertSlice";

export const getClients = createAsyncThunk("clients/getClients", async () => {
  try {
    const res = await axios.get(`http://localhost:3005/api/v1/clients`, {
      headers: {
        "Cache-Control": "max-age=3600",
      },
    });
    return res.data.clients;
  } catch (error) {
    throw new Error("Failed to fetch client list");
  }
});

export const addClient = createAsyncThunk(
  "clients/add",
  async (params, { dispatch, getState }) => {
    const client = params;
    try {
      const res = await axios.post(
        "http://localhost:3005/api/v1/client/create",
        client
      );
      if (res.data.isSuccess) {
        dispatch(showAlertAsync({ message: res.data.msg, type: "success" }));
        return res.data.client;
      } else {
        dispatch(showAlertAsync({ message: res.data.msg, type: "danger" }));
        return null;
      }
    } catch (error) {
      throw new Error("An error occurs, please try again");
    }
  }
);

export const deleteClient = createAsyncThunk(
  "clients/delete",
  async (clientId, { dispatch, getState }) => {
    try {
      const res = await axios.delete(
        `http://localhost:3005/api/v1/client/${clientId}`
      );
      if (res.data.isSuccess) {
        dispatch(showAlertAsync({ message: res.data.msg, type: "success" }));
        return clientId; // Return the deleted client id
      } else {
        dispatch(showAlertAsync({ message: res.data.msg, type: "danger" }));
      }
    } catch (error) {
      throw new Error("An error occurs, please try again");
    }
  }
);

export const editClient = createAsyncThunk(
  "clients/edit",
  async (params, { dispatch, getState }) => {
    const data = params;
    try {
      const res = await axios.put(
        `http://localhost:3005/api/v1/client/${data._id}`,
        data
      );
      if (res.data.isSuccess) {
        dispatch(showAlertAsync({ message: res.data.msg, type: "success" }));
        return res.data.client;
      } else {
        dispatch(showAlertAsync({ message: res.data.msg, type: "danger" }));
      }
    } catch (error) {
      throw new Error("An error occurs, please try again");
    }
  }
);

const ClientsSlice = createSlice({
  name: "clients",
  initialState: {
    loading: false,
    clientsList: [],
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClients.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clientsList = action.payload;
      })
      .addCase(getClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        if (action.payload !== null) {
          const newClient = action.payload;
          state.clientsList.push(newClient);
        }
      })
      .addCase(editClient.fulfilled, (state, action) => {
        const editedClient = action.payload;
        state.clientsList = state.clientsList.map((client) =>
          client._id === editedClient._id ? editedClient : client
        );
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        const deletedClientId = action.payload;
        state.clientsList = state.clientsList.filter(
          (client) => client._id !== deletedClientId
        );
      });
  },
});

export default ClientsSlice.reducer;
