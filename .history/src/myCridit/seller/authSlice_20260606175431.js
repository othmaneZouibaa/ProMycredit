import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// Async Thunks
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      // Map frontend fields to backend fields
      const payload = {
        name: userData.fullName,
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.password, // Using same password as confirmation
        role: userData.role,
        phone: userData.phone || null,
        cin: userData.cin || null,
        address: userData.storeName || userData.address || null,
      };
      
      const response = await api.post("/register", payload);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 
                     (error.response?.data?.errors ? Object.values(error.response.data.errors)[0][0] : "Registration failed");
      return rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/login", credentials);
      const { user, access_token } = response.data;
      
      // Store in localStorage
      localStorage.setItem("my_cridit_token", access_token);
      localStorage.setItem("my_cridit_session", JSON.stringify(user));
      
      return { user, token: access_token };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Invalid credentials");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/logout");
    } catch (error) {
      // Continue even if server logout fails
    } finally {
      localStorage.removeItem("my_cridit_token");
      localStorage.removeItem("my_cridit_session");
    }
    return null;
  }
);

export const initializeAuth = createAsyncThunk(
  "auth/initialize",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("my_cridit_token");
    if (!token) return rejectWithValue("No session found");
    
    try {
      const response = await api.get("/me");
      // The API returns the user object directly, not wrapped in { user: ... }
      const user = response.data; 
      
      if (!user || !user.id) {
        throw new Error("Invalid user data received");
      }

      localStorage.setItem("my_cridit_session", JSON.stringify(user));
      return { user, token };
    } catch (error) {
      localStorage.removeItem("my_cridit_token");
      localStorage.removeItem("my_cridit_session");
      return rejectWithValue(error.response?.data?.message || "Session expired");
    }
  }
);

const getStoredSession = () => {
  const session = localStorage.getItem("my_cridit_session");
  try {
    return session ? JSON.parse(session) : null;
  } catch (e) {
    return null;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!localStorage.getItem("my_cridit_token"),
    user: getStoredSession(),
    token: localStorage.getItem("my_cridit_token"),
    status: "idle",
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.status = "idle";
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        if (action.payload && action.payload.user) {
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
        } else {
          state.isAuthenticated = false;
          state.user = null;
          state.token = null;
        }
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });
  }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
