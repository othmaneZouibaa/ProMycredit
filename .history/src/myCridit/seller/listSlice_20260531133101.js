import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// Async Thunks
export const fetchConsumers = createAsyncThunk(
    "list/fetchConsumers",
    async (searchTerm = "", { rejectWithValue }) => {
        try {
            const url = searchTerm ? `/seller/consumers?search=${searchTerm}` : "/seller/consumers";
            const response = await api.get(url);
            return response.data.consumers;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch consumers");
        }
    }
);

export const addConsumer = createAsyncThunk(
    "list/addConsumer",
    async (consumerData, { rejectWithValue }) => {
        try {
            const response = await api.post("/seller/consumers", {
                name: consumerData.name,
                phone: consumerData.phone,
                cin: consumerData.cin,
                address: consumerData.address,
            });
            return response.data.consumer;
        } catch (error) {
            const message = error.response?.data?.message || 
                           (error.response?.data?.errors ? Object.values(error.response.data.errors)[0][0] : "Failed to add consumer");
            return rejectWithValue(message);
        }
    }
);

export const addCredit = createAsyncThunk(
    "list/addCredit",
    async (creditData, { rejectWithValue }) => {
        try {
            const response = await api.post("/seller/credits", {
                consumer_id: creditData.consumerId,
                product_name: creditData.productName,
                total_amount: creditData.total_amount,
            });
            return response.data.credit;
        } catch (error) {
            const message = error.response?.data?.message || 
                           (error.response?.data?.errors ? Object.values(error.response.data.errors)[0][0] : "Failed to add credit");
            return rejectWithValue(message);
        }
    }
);

export const addPayment = createAsyncThunk(
    "list/addPayment",
    async (paymentData, { rejectWithValue }) => {
        try {
            const response = await api.post("/seller/payments", {
                consumer_id: paymentData.consumerId,
                amount: paymentData.amount,
                payment_method: paymentData.paymentMethod || 'cash',
                note: paymentData.note || '',
            });
            return response.data.payment;
        } catch (error) {
            const message = error.response?.data?.message || 
                           (error.response?.data?.errors ? Object.values(error.response.data.errors)[0][0] : "Failed to register payment");
            return rejectWithValue(message);
        }
    }
);

const listSlice = createSlice({
    name: 'list',
    initialState: {
        list: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        clearListError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchConsumers.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchConsumers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchConsumers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addConsumer.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addConsumer.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload) {
                    state.list.push(action.payload);
                }
            })
            .addCase(addConsumer.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addCredit.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(addCredit.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addPayment.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addPayment.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(addPayment.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
})

export const { clearListError } = listSlice.actions
export default listSlice.reducer
