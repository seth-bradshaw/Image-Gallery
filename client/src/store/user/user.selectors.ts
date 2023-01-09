import { createSelector } from "@reduxjs/toolkit";
import { State } from "../types";

const selectUser = (state: State) => state.user;

export const getIsLoggedIn = createSelector(selectUser, ({ isLoggedIn }) => isLoggedIn);

export const getUser = createSelector(selectUser, (user) => user)