import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  bannerData: [],
  imageURL: "",
};

export const fusionSlice = createSlice({
  name: "fusion",
  initialState,
  reducers: {
    setBannerData: (state, action) => {
      state.bannerData = action.payload;
    },
    setImageURL : (state,action)=>{
        state.imageURL = action.payload
    }
  },
});

export const { setBannerData , setImageURL } = fusionSlice.actions;
export default fusionSlice.reducer;
