import { configureStore } from "@reduxjs/toolkit";
import modeSwitchReducer from "../features/modeSwitch/modeSwitchSlice"

export const store = configureStore({
    reducer: {
        modeSwitch: modeSwitchReducer
    }
})