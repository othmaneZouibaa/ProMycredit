import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const fetchDashboardStats = createAsyncThunk(
    "dashboard/fetchStats",
    async (_, { rejectWithValue }) => {
        try {
            const statsResponse = await api.get("/seller/dashboard-stats");
            const pendingResponse = await api.get("/seller/pending-credits");
            
            return {
                ...statsResponse.data,
                pending_credits: pendingResponse.data.credits
            };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch dashboard stats");
        }
    }
);

export const updateCredit = createAsyncThunk(
    "dashboard/updateCredit",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/seller/credits/${id}`, data);
            return response.data.credit;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update credit");
        }
    }
);

export const deleteCredit = createAsyncThunk(
    "dashboard/deleteCredit",
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/seller/credits/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete credit");
        }
    }
);

export const fetchSellerPaymentRequests = createAsyncThunk(
    "dashboard/fetchPaymentRequests",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/seller/payment-requests");
            return response.data.requests;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch payment requests");
        }
    }
);

export const approvePaymentRequest = createAsyncThunk(
    "dashboard/approvePaymentRequest",
    async (id, { rejectWithValue }) => {
        try {
            await api.post(`/seller/payment-requests/${id}/approve`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to approve payment request");
        }
    }
);

export const rejectPaymentRequest = createAsyncThunk(
    "dashboard/rejectPaymentRequest",
    async (id, { rejectWithValue }) => {
        try {
            await api.post(`/seller/payment-requests/${id}/reject`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to reject payment request");
        }
    }
);

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        stats: {
            total_consumers: 0,
            active_debtors: 0,
            total_issued_amount: 0,
            total_collected_amount: 0,
            total_unpaid_amount: 0,
            debt_aging: {
                on_time: 0,
                '1_30_days': 0,
                '31_60_days': 0,
                '60_plus_days': 0,
            }
        },
        recentCredits: [],
        recentPayments: [],
        pendingCredits: [],
        topDebtors: [],
        paymentRequests: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardStats.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDashboardStats.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.stats = action.payload.stats;
                state.recentCredits = action.payload.recent_credits;
                state.recentPayments = action.payload.recent_payments;
                state.pendingCredits = action.payload.pending_credits || [];
                state.topDebtors = action.payload.top_debtors || [];
            })
            .addCase(fetchDashboardStats.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteCredit.fulfilled, (state, action) => {
                state.recentCredits = state.recentCredits.filter(c => c.id !== action.payload);
            })
            .addCase(updateCredit.fulfilled, (state, action) => {
                const index = state.recentCredits.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    state.recentCredits[index] = {
                        ...state.recentCredits[index],
                        ...action.payload,
                        // Ensure consumer name is preserved if backend doesn't return it
                        consumer_name: state.recentCredits[index].consumer_name
                    };
                }
            })
            .addCase(fetchSellerPaymentRequests.fulfilled, (state, action) => {
                state.paymentRequests = action.payload;
            })
            .addCase(approvePaymentRequest.fulfilled, (state, action) => {
                state.paymentRequests = state.paymentRequests.filter(r => r.id !== action.payload);
            })
            .addCase(rejectPaymentRequest.fulfilled, (state, action) => {
                state.paymentRequests = state.paymentRequests.filter(r => r.id !== action.payload);
            });
    }
});

export default dashboardSlice.reducer;
