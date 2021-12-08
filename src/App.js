import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import EditContent from './components/EditContent';
import AdminRoute from './components/Navigation/AdminRoute';
import Navbar from './components/Navigation/Navbar';
import ProtectedRoute from './components/Navigation/ProtectedRoute';
import NotAdmin from './components/NotAdmin';
import AddExpense from './pages/expense/AddExpense';
import ExpensesList from './pages/expense/ExpensesList';
import Home from './pages/Home'
import AddIncome from './pages/income/AddIncome';
import IncomeList from './pages/income/IncomeList';
import DashboardData from './pages/users/DashboardData';
import Login from './pages/users/Login';
import Profile from './pages/users/Profile';
import Register from './pages/users/Register';
import UserProfileExpList from './pages/users/UserProfileExpList';
import UserProfileIncList from './pages/users/UserProfileIncList';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route exact path="/login" element={<Login />} />

        <Route exact path="/register" element={<Register />} />

        <Route exact path="/not-found" element={<NotAdmin />} />

        <Route exact path="/dashboard" element={<AdminRoute />}>
          <Route exact path="/dashboard" element={<DashboardData />} />
        </Route>

        <Route exact path="/profile" element={<Profile />} />

        <Route exact path="/edit/:id" element={<ProtectedRoute />}>
          <Route exact path="/edit/:id" element={<EditContent />} />
        </Route>

        {/* Expense */}
        <Route exact path="/add-expense" element={<ProtectedRoute />}>
          <Route exact path="/add-expense" element={<AddExpense />} />
        </Route>

        <Route exact path="/expenses" element={<ProtectedRoute />}>
          <Route exact path="/expenses" element={<ExpensesList />} />
        </Route>

        <Route exact path="/user-expenses" element={<ProtectedRoute />}>
          <Route exact path="/user-expenses" element={<UserProfileExpList />} />
        </Route>


        {/* Income */}
        <Route exact path="/add-income" element={<ProtectedRoute />}>
          <Route exact path="/add-income" element={<AddIncome />} />
        </Route>

        <Route exact path="/incomes" element={<ProtectedRoute />}>
          <Route exact path="/incomes" element={<IncomeList />} />
        </Route>

        <Route exact path="/user-incomes" element={<ProtectedRoute />}>
          <Route exact path="/user-incomes" element={<UserProfileIncList />} />
        </Route>

      </Routes>
    </BrowserRouter>

  );
}

export default App;
