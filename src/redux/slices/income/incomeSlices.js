import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../../utils/baseURL';

// Action for redirec
export const resetIncomeCreated = createAction("income/created/reset");
export const resetIncomeUpdated = createAction("income/update/reset");


// Income Action
export const createIncomeAction = createAsyncThunk('income/create', async (payload, { rejectWithValue, getState, dispatch }) => {
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
		const { data } = await axios.post(`${baseURL}/income/create`, payload, config)
		dispatch(resetIncomeCreated())
		return data;
	} catch (error) {
		if (!error?.response) {
			throw error;
		}
		return rejectWithValue(error?.response?.data)
	}
});

export const updateIncomeAction = createAsyncThunk('income/update', async (payload, { rejectWithValue, getState, dispatch }) => {
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
		const { data } = await axios.put(`${baseURL}/income/${payload?.id}`, payload, config)
		dispatch(resetIncomeUpdated())
		return data;
	} catch (error) {
		if (!error?.response) {
			throw error;
		}
		return rejectWithValue(error?.response?.data)
	}
});

export const fetchAllIncomeAction = createAsyncThunk('income', async (payload, { rejectWithValue, getState, dispatch }) => {
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
		const { data } = await axios.get(`${baseURL}/income?page=${payload}`, config)
		return data;
	} catch (error) {
		if (!error?.response) {
			throw error;
		}
		return rejectWithValue(error?.response?.data)
	}
});

const incomeSlice = createSlice({
	name: 'income',
	initialState: {},
	extraReducers: builder => {
		// Create Income Action
		// Handle pending state
		builder.addCase(createIncomeAction.pending, (state, action) => {
			state.loading = true;
		});
		// reset action
		builder.addCase(resetIncomeCreated, (state, action) => {
			state.isIncomeCreated = true;
		});

		// Handle success state
		builder.addCase(createIncomeAction.fulfilled, (state, action) => {
			state.loading = false;
			state.incomeCreated = action?.payload;
			state.appError = undefined;
			state.serverErr = undefined;
			state.isIncomeCreated = false;
		})

		// Handle success state
		builder.addCase(createIncomeAction.rejected, (state, action) => {
			state.loading = false;
			state.appError = action?.payload?.msg;
			state.serverErr = action?.payload?.msg;
		})

		// Fetch All Income Action
		// Handle pending state
		builder.addCase(fetchAllIncomeAction.pending, (state, action) => {
			state.loading = true;
		});

		// Handle success state
		builder.addCase(fetchAllIncomeAction.fulfilled, (state, action) => {
			state.loading = false;
			state.incomesList = action?.payload;
			state.appError = undefined;
			state.serverErr = undefined;
		})

		// Handle success state
		builder.addCase(fetchAllIncomeAction.rejected, (state, action) => {
			state.loading = false;
			state.appError = action?.payload?.msg;
			state.serverErr = action?.payload?.msg;
		})

		// Update Income Action
		// Handle pending state
		builder.addCase(updateIncomeAction.pending, (state, action) => {
			state.loading = true;
		});

		builder.addCase(resetIncomeUpdated, (state, action) => {
			state.isIncomeUpdated = true;
		});

		// Handle success state
		builder.addCase(updateIncomeAction.fulfilled, (state, action) => {
			state.loading = false;
			state.incomeUpdated = action?.payload;
			state.appError = undefined;
			state.serverErr = undefined;
			state.isIncomeUpdated = false;
		})

		// Handle success state
		builder.addCase(updateIncomeAction.rejected, (state, action) => {
			state.loading = false;
			state.appError = action?.payload?.msg;
			state.serverErr = action?.payload?.msg;
		})
	}
});

export default incomeSlice.reducer;