import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Environmental API Key configuration
const API_KEY = process.env.NEXT_PUBLIC_CURRENCY_API_KEY;

if (!API_KEY) {
  console.error("Missing NEXT_PUBLIC_CURRENCY_API_KEY Environment Variable");
}

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
