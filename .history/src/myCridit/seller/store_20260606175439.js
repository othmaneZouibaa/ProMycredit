import { configureStore } from "@reduxjs/toolkit";
import listSlice from './listSlice'
import authSlice from './authSlice'
import dashboardSlice from './dashboardSlice'
import consumerSlice from '../consumer/consumerSlice'

export default configureStore({
    reducer: {
        list: listSlice,
        auth: authSlice,
        dashboard: dashboardSlice,
        consumer: consumerSlice
    }
})