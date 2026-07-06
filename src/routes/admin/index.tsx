import { Navigate } from "react-router-dom";
import DashboardLayout from "../../layout/dashboard/index.jsx";
import Dashboard from "../../view/admin/dashboard/index.js";

const adminRoutes = [
    {
        path: "/admin/",
        element: <DashboardLayout />,
        children: [
            {
                path: "",
                element: <Navigate replace to="dashboard" />
            },
            {
                path: "dashboard",
                element: <Dashboard />
            },
        ]
    }
]

export default adminRoutes;