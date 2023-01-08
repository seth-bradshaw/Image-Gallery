import { configureStore } from "@reduxjs/toolkit";
import ui from './ui/uiSlice';
import user from './user/userSlice'

export const store = configureStore({
    reducer: {
        ui,
        user
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;