import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface glaobalSidebarDataType {
  collapse: boolean;
}

const initialState: glaobalSidebarDataType = {
  collapse: false,
};

const glaobalSidebarDataSlice = createSlice({
  name: "globalSidebarState",
  initialState,
  reducers: {
    setCollapsed: (state, action: PayloadAction< boolean >) => {
      state.collapse = action.payload;
    },
  },
});

export const { setCollapsed } = glaobalSidebarDataSlice.actions;
export default glaobalSidebarDataSlice.reducer;
