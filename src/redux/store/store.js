import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../slices/users/usersSlice';
import expenseReducer from '../slices/expenses/expenseSlices';
import incomeReducer from '../slices/income/incomeSlices';
import accountReducer from '../slices/accountStats/accountStatsSlices';

const store = configureStore({
	reducer: {
		users: usersReducer,
		expenses: expenseReducer,
		incomes: incomeReducer,
		account: accountReducer
	}
});

export default store;