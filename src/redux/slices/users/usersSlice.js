import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../../utils/baseURL';

// Login Action
export const loginUserAction = createAsyncThunk('user/login', async (payload, { rejectWithValue, getState, dispatch }) => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	}
	try {
		// http call
		const { data } = await axios.post(
			`${baseURL}/users/login`,
			payload,
			config
		);
		// Save user into localstorage
		localStorage.setItem('userInfo', JSON.stringify(data));
		return data;
	} catch (error) {
		if (!error?.response) {
			throw error;
		}
		return rejectWithValue(error?.response?.data)
	}
});

// Profile Action
export const userProfileAction = createAsyncThunk('user/profile', async (payload, { rejectWithValue, getState, dispatch }) => {
	const userToken = getState()?.users?.userAuth?.token;

	const config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${userToken}`
		}
	}
	try {
		// http call
		const { data } = await axios.get(`${baseURL}/users/profile`, config)
		return data;
	} catch (error) {
		if (!error?.response) {
			throw error;
		}
		return rejectWithValue(error?.response?.data)
	}
});


// Updae Profile Action
export const updateProfileAction = createAsyncThunk('user/update', async (payload, { rejectWithValue, getState, dispatch }) => {
	const userToken = getState()?.users?.userAuth?.token;

	const config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${userToken}`
		}
	}
	try {
		// http call
		const { data } = await axios.put(`${baseURL}/users/profile`,
			{ firstName: payload?.firstName, lastName: payload?.lastName, email: payload?.email }
			, config)
		return data;
	} catch (error) {
		if (!error?.response) {
			throw error;
		}
		return rejectWithValue(error?.response?.data)
	}
});

// Register Action
export const registerUserAction = createAsyncThunk('user/register', async (payload, { rejectWithValue, getState, dispatch }) => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	}
	try {
		// http call
		const { data } = await axios.post(`${baseURL}/users/register`, payload, config)
		return data;
	} catch (error) {
		if (!error?.response) {
			throw error;
		}
		return rejectWithValue(error?.response?.data)
	}
});


// Slices
const userLoginFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : undefined;
const usersSlices = createSlice({
	name: 'users',
	initialState: {
		userAuth: userLoginFromStorage
	},
	extraReducers: builder => {
		// Login Action
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
			state.userAppErr = action?.payload?.msg;
			state.userServerErr = action?.error?.msg;
		})

		// Register Action
		// Handle pending state
		builder.addCase(registerUserAction.pending, (state, action) => {
			state.userLoading = true;
			state.userAppErr = undefined;
			state.userServerErr = undefined;
		});

		// Handle success state
		builder.addCase(registerUserAction.fulfilled, (state, action) => {
			state.isRegistered = action?.payload;
			state.userLoading = false;
			state.userAppErr = undefined;
			state.userServerErr = undefined;
		})

		// Handle success state
		builder.addCase(registerUserAction.rejected, (state, action) => {
			state.userLoading = false;
			state.userAppErr = action?.payload?.msg;
			state.userServerErr = action?.error?.msg;
		})

		// Profile Action
		// Handle pending state
		builder.addCase(userProfileAction.pending, (state, action) => {
			state.loading = true;
			state.AppErr = undefined;
			state.ServerErr = undefined;
		});

		// Handle success state
		builder.addCase(userProfileAction.fulfilled, (state, action) => {
			state.profile = action?.payload;
			state.loading = false;
			state.AppErr = undefined;
			state.ServerErr = undefined;
		})

		// Handle success state
		builder.addCase(userProfileAction.rejected, (state, action) => {
			state.loading = false;
			state.AppErr = action?.payload?.msg;
			state.ServerErr = action?.error?.msg;
		})


		// Update Profile Action
		// Handle pending state
		builder.addCase(updateProfileAction.pending, (state, action) => {
			state.loading = true;
			state.AppErr = undefined;
			state.ServerErr = undefined;
		});

		// Handle success state
		builder.addCase(updateProfileAction.fulfilled, (state, action) => {
			state.profile = action?.payload;
			state.loading = false;
			state.AppErr = undefined;
			state.ServerErr = undefined;
		})

		// Handle success state
		builder.addCase(updateProfileAction.rejected, (state, action) => {
			state.loading = false;
			state.AppErr = action?.payload?.msg;
			state.ServerErr = action?.error?.msg;
		})
	}
});

export default usersSlices.reducer;