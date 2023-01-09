import { createSelector } from "@reduxjs/toolkit";
import { State } from "../types";
const selectUser = (state: State) => state.user;
// @ts-ignore
export const getIsLoggedIn = createSelector(selectUser, ({ isLoggedIn }) => isLoggedIn);