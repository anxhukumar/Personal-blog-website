import { createSlice } from "@reduxjs/toolkit";

const initialState = {id:"", category: ""}

export const selectedBlogSlice = createSlice({
    name:'selectedBlog',
    initialState,
    reducers:{
    
        setCurrentBlog: (state, action) => {
            const { id, category } = action.payload;
            state.id = id;
            state.category = category;
          }
    }
})

export const {setCurrentBlog} = selectedBlogSlice.actions;

export default selectedBlogSlice.reducer;