import { createSlice } from "@reduxjs/toolkit";
import { ModalOptions, UIState } from '../types'

const initialState: UIState = {
  modal: null,
  poppedImage: null
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changeModal: (state, action) => {
      state.modal = action.payload;
    },
    popImage: (state, action) => {
      state.modal = ModalOptions.image;
      state.poppedImage = action.payload
    }
  }
});

export const { changeModal, popImage } = uiSlice.actions;

export default uiSlice.reducer;
