import { configureStore } from '@reduxjs/toolkit'
import fusionReducer from "./FrameFusionSlice"
export const store = configureStore({
  reducer: {
    movieData : fusionReducer
  },
})