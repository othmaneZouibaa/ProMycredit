import { configureStore } from "@reduxjs/toolkit";
import TutoSlice from './tutoSlice'
export default configureStore({
    reducer: {
        tuto: TutoSlice
    }
})