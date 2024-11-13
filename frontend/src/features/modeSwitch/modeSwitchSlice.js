import { createSlice } from "@reduxjs/toolkit";

const initialState = {mode:"tech"}

export const modeSwitchSlice = createSlice({
    name:'modeSwitch',
    initialState,
    reducers:{
        techMode:(state) => {
            state.mode = "tech";
        },
        lifeMode:(state) => {
            state.mode = "life";
        }
    }
})

export const {techMode, lifeMode} = modeSwitchSlice.actions;

export default modeSwitchSlice.reducer;