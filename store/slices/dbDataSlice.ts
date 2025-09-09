import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Connection {
  connection_string: string;
  type: string;
}

interface DbData {
  data: Connection[];
}

const initialState: DbData = {
  data: [],
};

const dbDataSlice = createSlice({
  name: "dbData",
  initialState,
  reducers: {
    setDbDataState: (
      state,
      action: PayloadAction<{ data: { connections: Connection[] } }>
    ) => {
      state.data = action.payload.data.connections;
    },
  },
});

export const { setDbDataState } = dbDataSlice.actions;
export default dbDataSlice.reducer;
