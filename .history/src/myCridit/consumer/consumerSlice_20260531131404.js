import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const fetchConsumerStats = createAsyncThunk(
    "consumer/fetchStats",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/consumer/dashboard-stats");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch stats");
        }
    }
);

export const fetchConsumerCredits = createAsyncThunk(
    "consumer/fetchCredits",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/consumer/credits");
            return response.data.credits;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch credits");
        }
    }
);

export const fetchConsumerPayments = createAsyncThunk(
    "consumer/fetchPayments",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/consumer/payments");
            return response.data.payments;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch payments");
        }
    }
);

export const fetchNotifications = createAsyncThunk(
    "consumer/fetchNotifications",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/notifications");
            return response.data.notifications;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch notifications");
        }
    }
);

export const markNotificationRead = createAsyncThunk(
    "consumer/markNotificationRead",
    async (id, { rejectWithValue }) => {
        try {
            await api.patch(`/notifications/${id}/read`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to mark notification as read");
        }
    }
);

const consumerSlice = createSlice({
    name: 'consumer',
    initialState: {
        stats: {
            total_remaining_debt: 0,
            total_paid_amount: 0,
            trust_score: 0,
            debt_progress_percentage: 0,
            next_due_date: null,
        },
        credits: [],
        payments: [],
        notifications: [],
        recentCredits: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchConsumerStats.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchConsumerStats.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.stats = action.payload.stats;
                state.recentCredits = action.payload.recent_credits;
            })
            .addCase(fetchConsumerStats.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchConsumerCredits.fulfilled, (state, action) => {
                state.credits = action.payload;
            })
            .addCase(fetchConsumerPayments.fulfilled, (state, action) => {
                state.payments = action.payload;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.notifications = action.payload;
            })
            .addCase(markNotificationRead.fulfilled, (state, action) => {
                const note = state.notifications.find(n => n.id === action.payload);
                if (note) note.is_read = true;
            });
    }
});

export default consumerSlice.reducer;
