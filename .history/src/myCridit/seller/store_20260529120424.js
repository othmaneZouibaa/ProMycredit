import { configureStore } from "@reduxjs/toolkit";
import listSlice from './listSlice'
import authSlice from './authSlice'

export default configureStore({
    reducer: {
        list: listSlice,
        auth: authSlice
    }
})