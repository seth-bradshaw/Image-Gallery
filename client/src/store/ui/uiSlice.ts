import { createSlice } from "@reduxjs/toolkit";
import { UIState } from '../types'

const initialState: UIState = {
    modal: null
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changeModal: (state, action) => {
      state.modal = action.payload;
    },
  }
});

export const { changeModal } = uiSlice.actions;

export default uiSlice.reducer;
