import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";


import LoginPage from "../pages/auth/LoginPage";

import AdminDashboard from "../pages/admin/AdminDashboard";

import ManagerDashboard from "../pages/manager/ManagerDashboard";

import HRDashboard from "../pages/hr/HRDashboard";

import EmployeeDashboard from "../pages/employee/EmployeeDashboard";

import NewRequest from "../pages/employee/NewRequest";

import MyRequests from "../pages/employee/MyRequests";

import ProtectedRoute from "./ProtectedRoute";

import Calendar from "../pages/employee/Calendar";

function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>


                {/* HOME */}

                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/login"
                            replace
                        />
                    }
                />


                {/* LOGIN */}

                <Route
                    path="/login"
                    element={
                        <LoginPage />
                    }
                />


                {/* ADMIN */}

                <Route
                    path="/admin/dashboard"
                    element={

                        <ProtectedRoute allowedRole="admin">

                            <AdminDashboard />

                        </ProtectedRoute>

                    }
                />


                {/* MANAGER */}

                <Route
                    path="/manager/dashboard"
                    element={

                        <ProtectedRoute allowedRole="manager">

                            <ManagerDashboard />

                        </ProtectedRoute>

                    }
                />


                {/* RH */}

                <Route
                    path="/hr/dashboard"
                    element={

                        <ProtectedRoute allowedRole="rh">

                            <HRDashboard />

                        </ProtectedRoute>

                    }
                />


                {/* EMPLOYEE */}

                <Route
                    path="/employee/dashboard"
                    element={

                        <ProtectedRoute allowedRole="employee">

                            <EmployeeDashboard />

                        </ProtectedRoute>

                    }
                />


                {/* NEW REQUEST */}

                <Route
                    path="/employee/new-request"
                    element={

                        <ProtectedRoute allowedRole="employee">

                            <NewRequest />

                        </ProtectedRoute>

                    }
                />


                {/* MY REQUESTS */}

                <Route
                    path="/employee/requests"
                    element={

                        <ProtectedRoute allowedRole="employee">

                            <MyRequests />

                        </ProtectedRoute>

                    }
                />
                <Route
                    path="/employee/calendar"
                    element={
                        <ProtectedRoute allowedRole="employee">
                            <Calendar />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );
}


export default AppRoutes;