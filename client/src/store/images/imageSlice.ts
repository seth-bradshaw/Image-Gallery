import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchImagesResponse, ImagesState } from "../types";
import fetchImages from "./fetchImages.thunk";

// ? do we even need offset
const initialState: ImagesState = {
  images: [],
  next: null,
  prev: null,
  offset: 0,
  limit: 2,
  status: '',
  error: null
};

export const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    changeGallerySize: (state, action) => {
        state.limit = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImages.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(
      fetchImages.fulfilled,
      (state, { payload }: PayloadAction<FetchImagesResponse>) => {
        state.images = payload.images;
        state.next = payload.next;
        state.prev = payload.prev;
        state.status = "idle";
        state.error = null;
      }
    );

    builder.addCase(fetchImages.rejected, (state, { payload }) => {
      if (payload) state = { ...initialState, error: payload as Error };
      state.status = "idle";
    });
  },
});

export const { changeGallerySize } = imagesSlice.actions;

export default imagesSlice.reducer;
