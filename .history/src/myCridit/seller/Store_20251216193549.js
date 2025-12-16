import { configureStore } from "@reduxjs/toolkit";
import listSlice from './'
export default configureStore({
    reducer: {
        list: listSlice
    }
})