import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const showAlertAsync = createAsyncThunk(
  "alert/showAlert",
  async (payload, { dispatch }) => {
    dispatch(showAlert(payload));
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(hideAlert());
        resolve();
      }, 9000);
    });
  }
);

const alertSlice = createSlice({
  name: "alert",
  initialState: { visible: false, message: "", type: "" },
  reducers: {
    showAlert: (state, action) => {
      state.visible = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideAlert: (state) => {
      state.visible = false;
      state.message = "";
      state.type = "";
    },
  },
});

export { showAlertAsync };
export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
