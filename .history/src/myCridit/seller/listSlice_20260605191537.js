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

export const fetchSellerPendingCredits = createAsyncThunk(
    "list/fetchPendingCredits",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/seller/pending-credits");
            return response.data.credits;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch pending requests");
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

export const updateConsumer = createAsyncThunk(
    "list/updateConsumer",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/seller/consumers/${id}`, data);
            return response.data.consumer;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update consumer");
        }
    }
);

export const deleteConsumer = createAsyncThunk(
    "list/deleteConsumer",
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/seller/consumers/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete consumer");
        }
    }
);

const listSlice = createSlice({
    name: 'list',
    initialState: {
        list: [],
        pendingCredits: [],
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
            .addCase(fetchSellerPendingCredits.fulfilled, (state, action) => {
                state.pendingCredits = action.payload;
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
            })
            .addCase(updateConsumer.fulfilled, (state, action) => {
                const index = state.list.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = { ...state.list[index], ...action.payload };
                }
            })
            .addCase(deleteConsumer.fulfilled, (state, action) => {
                state.list = state.list.filter(c => c.id !== action.payload);
            });
    }
})

export const { clearListError } = listSlice.actions
export default listSlice.reducer
