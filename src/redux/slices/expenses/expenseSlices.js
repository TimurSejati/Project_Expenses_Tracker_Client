import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../../utils/baseURL';

// Expense Action
export const createExpenseAction = createAsyncThunk('expense/create', async (payload, { rejectWithValue, getState, dispatch }) => {
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
		const { data } = await axios.post(`${baseURL}/expense/create`, payload, config)
		return data;
	} catch (error) {
		if (!error?.response) {
			throw error;
		}
		return rejectWithValue(error?.response?.data)
	}
});

const expenseSlice = createSlice({
	name: 'expenses',
	initialState: {},
	extraReducers: builder => {
		// Expense Action
		// Handle pending state
		builder.addCase(createExpenseAction.pending, (state, action) => {
			state.loading = true;
		});

		// Handle success state
		builder.addCase(createExpenseAction.fulfilled, (state, action) => {
			state.loading = false;
			state.expenseCreated = action?.payload;
			state.appError = undefined;
			state.serverErr = undefined;
		})

		// Handle success state
		builder.addCase(createExpenseAction.rejected, (state, action) => {
			state.loading = false;
			state.appError = action?.payload?.msg;
			state.serverErr = action?.payload?.msg;
		})
	}
});

export default expenseSlice.reducer;