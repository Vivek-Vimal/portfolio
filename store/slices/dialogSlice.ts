import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DialogState {
  open: boolean;
  message: string;
  func: ((index?: number) => Promise<void>) | null;
  index?: number; // ✅ Make index optional
}

const initialState: DialogState = {
  open: false,
  message: "",
  func: null,
  index: undefined,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    handleDialogClose: (state) => {
      state.open = false;
      state.func = null;
      state.index = undefined;
    },
    handleDialogOpen: (
      state,
      action: PayloadAction<{
        message: string;
        func: (index?: number) => Promise<void>;
        index?: number;
      }>
    ) => {
      state.open = true;
      state.message = action.payload.message;
      state.func = action.payload.func;
      state.index = action.payload.index; // ✅ Will be undefined if not passed
    },
    handleExecute: (state) => {
      if (state.func) {
        state.func(state.index); // ✅ If index is undefined, it will be ignored
      }
      state.open = false;
      state.func = null;
      state.index = undefined;
    },
  },
});

export const { handleDialogClose, handleDialogOpen, handleExecute } =
  dialogSlice.actions;
export default dialogSlice.reducer;
