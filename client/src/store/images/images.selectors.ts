import { createSelector } from "@reduxjs/toolkit";
import { State } from "../types";

const selectImages = (state: State) => state.images;

// @ts-ignore
export const getImages = createSelector(selectImages, ({ images }) => images);

// @ts-ignore
export const getNextRequestUrl = createSelector(selectImages, ({ next }) => next);

// @ts-ignore
export const getPrevRequestUrl = createSelector(selectImages, ({ prev }) => prev);
