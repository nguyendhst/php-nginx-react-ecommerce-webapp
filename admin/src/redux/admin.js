import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const setItemLocal = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));
export const getItemLocal = (key) =>
  JSON.parse(window.localStorage.getItem(key));
const removeItemLocal = (key) => window.localStorage.removeItem(key);

export const loginApi = createAsyncThunk(
  "loginApi",
  async ({ email, password }, { rejectWithValue }) => {
    const response = await fetch(
      "https://security.hoctapkethop.com/v1/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const jsonData = await response.json();
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(jsonData);
    }
    return jsonData;
  }
);
export const refreshToken = createAsyncThunk(
  "refreshToken",
  async (token, { rejectWithValue }) => {
    const response = await fetch(
      "https://security.hoctapkethop.com/v1/auth/refresh-tokens",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(token),
      }
    );
    const jsonData = await response.json();
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(jsonData);
    }
    return jsonData;
  }
);

const initialState = {
  user: getItemLocal("user") ? getItemLocal("user") : {},
  isLoading: false,
  errorMessage: "",
  isLogin: getItemLocal("user") ? true : false,
};

export const admin = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoading = false;
      state.isLogin = false;
      state.errorMessage = "";
      state.user = {};
      removeItemLocal("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginApi.rejected, (state, actions) => {
        state.isLoading = false;
        state.isLogin = false;
        state.errorMessage = actions.payload.message;
        state.user = {};
      })
      .addCase(loginApi.pending, (state, actions) => {
        state.isLoading = true;
      })
      .addCase(loginApi.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isLogin = true;
        state.errorMessage = "";
        state.user = actions.payload;
        setItemLocal("user", actions.payload);
      })

      .addCase(refreshToken.rejected, (state, actions) => {
        if (parseInt(actions.payload.code) !== 401) return;
        state.isLoading = false;
        state.isLogin = false;
        state.errorMessage = "";
        state.user = {};
        removeItemLocal("user");
      })
      .addCase(refreshToken.fulfilled, (state, actions) => {
        state.user.tokens = actions.payload;
        setItemLocal("user", state.user);
      });
  },
});

export const { logout } = admin.actions;

export default admin.reducer;
