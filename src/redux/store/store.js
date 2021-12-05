import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../slices/users/usersSlice';
import expenseReducer from '../slices/expenses/expenseSlices';

const store = configureStore({
	reducer: {
		users: usersReducer,
		expenses: expenseReducer
	}
});

export default store;