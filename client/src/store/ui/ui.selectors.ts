import { createSelector } from "@reduxjs/toolkit";

// @ts-ignore
export const getModal = createSelector((state) => state.ui.modal, (modal) => modal)

