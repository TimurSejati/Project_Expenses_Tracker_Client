import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../../utils/baseURL';


// Action for redirec
export const resetExpenseCreated = createAction("expense/created/reset");
export const resetExpenseUpdated = createAction("expense/update/reset");

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
		dispatch(resetExpenseCreated())
		return data;
	} catch (error) {
		if (!error?.response) {
			throw error;
		}
		return rejectWithValue(error?.response?.data)
	}
});

export const updateExpenseAction = createAsyncThunk('expense/update', async (payload, { rejectWithValue, getState, dispatch }) => {
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
		const { data } = await axios.put(`${baseURL}/expense/${payload?.id}`, payload, config)
		dispatch(resetExpenseUpdated())
		return data;
	} catch (error) {
		if (!error?.response) {
			throw error;
		}
		return rejectWithValue(error?.response?.data)
	}
});

export const fetchAllExpenseAction = createAsyncThunk('expense', async (payload, { rejectWithValue, getState, dispatch }) => {
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
		const { data } = await axios.get(`${baseURL}/expense?page=${payload}`, config)
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
		// Create Expense Action
		// Handle pending state
		builder.addCase(createExpenseAction.pending, (state, action) => {
			state.loading = true;
		});

		builder.addCase(resetExpenseCreated, (state, action) => {
			state.isExpenseCreated = true;
		})

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

		// Fetch All Expense Action
		// Handle pending state
		builder.addCase(fetchAllExpenseAction.pending, (state, action) => {
			state.loading = true;
		});

		// Handle success state
		builder.addCase(fetchAllExpenseAction.fulfilled, (state, action) => {
			state.loading = false;
			state.expensesList = action?.payload;
			state.appError = undefined;
			state.serverErr = undefined;
		})

		// Handle success state
		builder.addCase(fetchAllExpenseAction.rejected, (state, action) => {
			state.loading = false;
			state.appError = action?.payload?.msg;
			state.serverErr = action?.payload?.msg;
		})

		// Update Expense Action
		// Handle pending state
		builder.addCase(updateExpenseAction.pending, (state, action) => {
			state.loading = true;
		});

		builder.addCase(resetExpenseUpdated, (state, action) => {
			state.isExpenseUpdated = true;
		})

		// Handle success state
		builder.addCase(updateExpenseAction.fulfilled, (state, action) => {
			state.loading = false;
			state.expenseUpdated = action?.payload;
			state.appError = undefined;
			state.serverErr = undefined;
		})

		// Handle success state
		builder.addCase(updateExpenseAction.rejected, (state, action) => {
			state.loading = false;
			state.appError = action?.payload?.msg;
			state.serverErr = action?.payload?.msg;
		})
	}
});

export default expenseSlice.reducer;