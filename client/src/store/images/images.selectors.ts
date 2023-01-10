import { createSelector } from "@reduxjs/toolkit";
import { State } from "../types";

const selectImages = (state: State) => state.images;

export const getImages = createSelector(selectImages, ({ images }) => images);

export const getNextRequestUrl = createSelector(selectImages, ({ next }) => next);

export const getPrevRequestUrl = createSelector(selectImages, ({ prev }) => prev);
