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
            });
    }
});

export default dashboardSlice.reducer;
