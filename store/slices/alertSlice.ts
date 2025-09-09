import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define severity type
type AlertSeverity = "error" | "warning" | "info" | "success";

interface AlertState {
  message: string;
  severity: AlertSeverity;
  open: boolean;
}

const initialState: AlertState = {
  message: "",
  severity: "info",
  open: false,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (
      state,
      action: PayloadAction<{ message: string; severity: AlertSeverity }>
    ) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.open = true;
    },
    hideAlert: (state) => {
      state.open = false;
      state.message = "";
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
