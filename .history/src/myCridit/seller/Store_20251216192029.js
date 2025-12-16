import { configureStore } from "@reduxjs/toolkit";
import listSlice from './tutoSlice'
export default configureStore({
    reducer: {
        list: listSlice
    }
})