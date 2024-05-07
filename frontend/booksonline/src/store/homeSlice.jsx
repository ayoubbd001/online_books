import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState = {
  clientCount: 0,
  empruntCount: 0,
  livreCount: 0,
  status: "idle",
  error: null,
};

// Create async thunks to fetch counts for each model
export const fetchClientCount = createAsyncThunk(
  "home/fetchClientCount",
  async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.get(
        "http://localhost:3005/api/v1/client-count"
      );
      return response.data.count;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchEmpruntCount = createAsyncThunk(
  "home/fetchEmpruntCount",
  async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.get(
        "http://localhost:3006/api/v1/emp-count"
      );
      return response.data.count;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchLivreCount = createAsyncThunk(
  "home/fetchLivreCount",
  async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/livre-count"
      );
      return response.data.count;
    } catch (error) {
      throw error;
    }
  }
);

// Create the home slice
const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientCount.fulfilled, (state, action) => {
        state.clientCount = action.payload;
      })
      .addCase(fetchEmpruntCount.fulfilled, (state, action) => {
        state.empruntCount = action.payload;
      })
      .addCase(fetchLivreCount.fulfilled, (state, action) => {
        state.livreCount = action.payload;
        state.status = "succeeded";
      })
      .addMatcher(
        (action) =>
          action.type.endsWith("/pending") || action.type.endsWith("/rejected"),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.status = "succeeded";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

// Export the actions and reducer
export default homeSlice.reducer;
export const selectClientCount = (state) => state.home.clientCount;
export const selectEmpruntCount = (state) => state.home.empruntCount;
export const selectLivreCount = (state) => state.home.livreCount;
