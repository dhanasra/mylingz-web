import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false
}


const app = createSlice({
  name: "app",
  initialState,
  reducers: {
    initialize: (state, action)=>{
        
    },
    showLoader: (state)=>{
      state.isLoading = true;
    },
    hideLoader: (state)=>{
      state.isLoading = false;
    }
  }  
})

export const {initialize, showLoader, hideLoader} = app.actions;

export default app.reducer;