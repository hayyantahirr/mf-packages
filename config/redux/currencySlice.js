import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// FREE API KEY (Ideally this should be in an env file)
// Enter your API Key from https://www.exchangerate-api.com/ here
const API_KEY = "50c85d53bea3a30019d6f436"; 
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/PKR`;

export const fetchExchangeRates = createAsyncThunk(
  "currency/fetchRates",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data.conversion_rates;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    selectedCurrency: "PKR",
    exchangeRates: { PKR: 1 },
    lastUpdated: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    setCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeRates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExchangeRates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.exchangeRates = action.payload;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchExchangeRates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
