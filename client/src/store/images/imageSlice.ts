import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isNil } from "rambda";
import { FetchImagesResponseWithError, Image, ImagesState } from "../types";
import fetchImages from "./fetchImages.thunk";
import uploadImage from "./uploadImage.thunk";
import { FETCH_IMAGES } from "../../constants/endpoints";

const maybeUpdateState = (state: ImagesState, payload: Image) => {
  if (isNil(state.next)) {
    // * determining if on last page, and new image creates new page
    if (state.images.length + 1 > state.limit) {
      state.next = `${FETCH_IMAGES}?offset=${state.offset + 1}&limit=${state.limit}`
    }

    // * determining if current page is the last
    if (state.images.length < state.limit) {
      state.images.push(payload);
    }
  }

  return state; 
}

const initialState: ImagesState = {
  images: [],
  next: null,
  prev: null,
  offset: 0,
  limit: 9,
  status: '',
  error: null
};

export const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    changeGallerySize: (state, action) => {
        state.limit = action.payload;
    },
    clearImages: (state) => {
      state.images = initialState.images;
      state.next = initialState.next;
      state.prev = initialState.prev;
      state.offset = initialState.offset;
      state.limit = initialState.limit;
      state.status = initialState.status;
      state.error = initialState.error;
    }
  },
  extraReducers: (builder) => {
    // * fetch images cases
    builder.addCase(fetchImages.pending, (state) => {
      state.images = [];
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(
      fetchImages.fulfilled,
      (state, { payload }: PayloadAction<FetchImagesResponseWithError>) => {
        state.images = payload.images;
        state.next = payload.next;
        state.prev = payload.prev;
        state.offset += payload.images.length;
        state.status = "idle";
        state.error = null;
      }
    );

    builder.addCase(fetchImages.rejected, (state, { payload }) => {
      if (payload) state = { ...initialState, error: payload as Error };
      state.status = "idle";
    });

    // * upload image cases
    builder.addCase(uploadImage.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(uploadImage.fulfilled, (state, { payload }) => {
      state = maybeUpdateState(state, payload);
      state.status = "idle"
      state.error = null;
    });

    builder.addCase(uploadImage.rejected, (state, { payload }) => {
      state.error = payload as Error ?? { message: 'Failed to upload image details.' }; 
      state.status = "idle";
    })
  },
});

export const { changeGallerySize, clearImages } = imagesSlice.actions;

export default imagesSlice.reducer;
