import { configureStore } from "@reduxjs/toolkit";
import ui from './ui/uiSlice';
import user from './user/userSlice'
import images from "./images/imageSlice";

export const store = configureStore({
    reducer: {
        ui,
        user,
        images
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;