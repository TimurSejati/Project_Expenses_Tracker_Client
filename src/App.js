import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminRoute from './components/Navigation/AdminRoute';
import Navbar from './components/Navigation/Navbar';
import ProtectedRoute from './components/Navigation/ProtectedRoute';
import NotAdmin from './components/NotAdmin';
import AddExpense from './pages/expense/AddExpense';
import EditExpense from './pages/expense/EditExpense';
import ExpensesList from './pages/expense/ExpensesList';
import Home from './pages/Home'
import AddIncome from './pages/income/AddIncome';
import DashboardData from './pages/users/DashboardData';
import Login from './pages/users/Login';
import Profile from './pages/users/Profile';
import Register from './pages/users/Register';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route exact path="/login" element={<Login />} />

        <Route exact path="/register" element={<Register />} />

        <Route exact path="/not-found" element={<NotAdmin />} />

        <Route exact path="/add-income" element={<ProtectedRoute />}>
          <Route exact path="/add-income" element={<AddIncome />} />
        </Route>

        {/* Expense */}
        <Route exact path="/add-expense" element={<ProtectedRoute />}>
          <Route exact path="/add-expense" element={<AddExpense />} />
        </Route>

        <Route exact path="/expenses" element={<ProtectedRoute />}>
          <Route exact path="/expenses" element={<ExpensesList />} />
        </Route>

        <Route exact path="/edit-expense/:id" element={<ProtectedRoute />}>
          <Route exact path="/edit-expense/:id" element={<EditExpense />} />
        </Route>

        <Route exact path="/profile" element={<Profile />} />

        <Route exact path="/dashboard" element={<AdminRoute />}>
          <Route exact path="/dashboard" element={<DashboardData />} />
        </Route>

      </Routes>
    </BrowserRouter>

  );
}

export default App;
