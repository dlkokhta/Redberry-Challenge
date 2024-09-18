import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface types {
  id: any;
  name: string;
  surname: string;
  avatar: string;
}

interface agentsTypes {
  agents: types[];
}

const initialState: agentsTypes = {
  agents: [],
};

const agentsSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {
    setAgents: (state, action: PayloadAction<types[]>) => {
      state.agents = action.payload;
    },
  },
});

export const { setAgents } = agentsSlice.actions;
export default agentsSlice.reducer;
