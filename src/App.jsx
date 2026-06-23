import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApplyLeave from "./PageS/ApplyLeave";
import MyLeaves from "./Pages/MyLeaves";
import LeaveBalance from "./pages/LeaveBalance";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ManagerDashboard from "./Pages/ManagerDashboard.jsx";
import ManagerHistory from "./Pages/ManagerHistory.jsx";
import AdminDashboard from "./Pages/AdminDashboard";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";


function App() {

    return (
        <BrowserRouter>

            <Routes>
                <Route
                    path="/apply"
                    element={
                        <ProtectedRoute>
                            <ApplyLeave />
                        </ProtectedRoute>
                        }
                />

                <Route
                    path="/myleaves"
                    element={
                    <ProtectedRoute>
                        <MyLeaves />
                    </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin"
                    element={
                    <ProtectedRoute><AdminDashboard /></ProtectedRoute>
                    }
                />

                <Route
                    path="/manager"
                    element={
                    <ProtectedRoute><ManagerDashboard /></ProtectedRoute>
                    }
                />
                <Route
                    path="/history"
                    element={
                    <ProtectedRoute><ManagerHistory /></ProtectedRoute>
                    }
                />

                <Route
                    path="/balance"
                    element={
                        <ProtectedRoute><LeaveBalance /></ProtectedRoute>
                    }
                />

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/employee"
                    element={
                        <ProtectedRoute>
                            <EmployeeDashboard />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;