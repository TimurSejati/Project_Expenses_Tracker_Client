import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Login Action

export const loginUserAction = createAsyncThunk('user/login', async (payload, { rejectWithValue, getState, dispatch }) => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	}
	try {
		// http call
		const { data } = await axios.post('localhost:5000/api/users/login', payload, config)
		console.log(data);
	} catch (error) {
		if (!error?.response) {
			throw error;
		}
		return rejectWithValue(error?.response?.data)
	}
});


// Slices

const usersSlices = createSlice({
	name: 'users',
	initialState: {},
	extraReducers: builder => {
		// Handle pending state
		builder.addCase(loginUserAction.pending, (state, action) => {
			state.userLoading = true;
			state.userAppErr = undefined;
			state.userServerErr = undefined;
		});

		// Handle success state
		builder.addCase(loginUserAction.fulfilled, (state, action) => {
			state.userAuth = action?.payload;
			state.userLoading = false;
			state.userAppErr = undefined;
			state.userServerErr = undefined;
		})

		// Handle success state
		builder.addCase(loginUserAction.rejected, (state, action) => {
			state.userLoading = false;
			state.userAppErr = action?.payload?.message;
			state.userServerErr = action?.error?.message;
		})
	}
});

export default usersSlices.reducer;