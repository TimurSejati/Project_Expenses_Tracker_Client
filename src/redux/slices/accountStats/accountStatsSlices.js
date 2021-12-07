import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../../utils/baseURL';

// Expense Action
export const fetchAccountStatsAction = createAsyncThunk('account/fetch', async (payload, { rejectWithValue, getState, dispatch }) => {
	// Get user token from stored
	const userToken = getState()?.users?.userAuth?.token;

	const config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${userToken}`
		}
	}
	try {
		// http call
		const { data } = await axios.get(`${baseURL}/accounts-statistics`, config)
		return data;
	} catch (error) {
		if (!error?.response) {
			throw error;
		}
		return rejectWithValue(error?.response?.data)
	}
});

const accountSlice = createSlice({
	name: 'account',
	initialState: {},
	extraReducers: builder => {
		// Fetch All Expense Action
		// Handle pending state
		builder.addCase(fetchAccountStatsAction.pending, (state, action) => {
			state.loading = true;
		});

		// Handle success state
		builder.addCase(fetchAccountStatsAction.fulfilled, (state, action) => {
			state.loading = false;
			state.accountDetails = action?.payload;
			state.appError = undefined;
			state.serverErr = undefined;
		})

		// Handle success state
		builder.addCase(fetchAccountStatsAction.rejected, (state, action) => {
			state.loading = false;
			state.appError = action?.payload?.msg;
			state.serverErr = action?.payload?.msg;
		})


	}
});

export default accountSlice.reducer;