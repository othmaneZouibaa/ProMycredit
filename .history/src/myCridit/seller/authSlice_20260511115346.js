import { createSlice } from "@reduxjs/toolkit";

// Helper to get users from localStorage
const getStoredUsers = () => {
  const users = localStorage.getItem("my_cridit_users");
  return users ? JSON.parse(users) : [];
};

// Helper to get current session from localStorage
const getStoredSession = () => {
  const session = localStorage.getItem("my_cridit_session");
  return session ? JSON.parse(session) : null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!getStoredSession(),
    user: getStoredSession(),
    users: getStoredUsers(), // All registered users (mock DB)
    error: null
  },
  reducers: {
    register: (state, action) => {
      const newUser = action.payload;
      const existingUser = state.users.find(u => u.email === newUser.email);
      
      if (existingUser) {
        state.error = "User already exists with this email.";
        return;
      }

      state.users.push(newUser);
      localStorage.setItem("my_cridit_users", JSON.stringify(state.users));
      state.error = null;
    },
    login: (state, action) => {
      const { email, password, role } = action.payload;
      const user = state.users.find(u => u.email === email && u.password === password && u.role === role);

      if (user) {
        state.isAuthenticated = true;
        state.user = user;
        state.error = null;
        localStorage.setItem("my_cridit_session", JSON.stringify(user));
      } else {
        state.error = "Invalid credentials or user type.";
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      localStorage.removeItem("my_cridit_session");
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { register, login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
