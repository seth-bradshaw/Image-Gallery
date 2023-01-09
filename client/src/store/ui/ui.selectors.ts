import { createSelector } from "@reduxjs/toolkit";
import { State } from "../types";

const selectUI = (state: State) => state.ui;

export const getModal = createSelector(selectUI, ({ modal }) => modal);

export const getPoppedImage = createSelector(selectUI, ({ poppedImage }) => poppedImage);
