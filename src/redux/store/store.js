import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../slices/users/usersSlice';
import expenseReducer from '../slices/expenses/expenseSlices';
import incomeReducer from '../slices/income/incomeSlices';

const store = configureStore({
	reducer: {
		users: usersReducer,
		expenses: expenseReducer,
		incomes: incomeReducer
	}
});

export default store;