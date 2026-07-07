import { Navigate } from "react-router-dom";
import Index from "../../layout/main/index.js";
import PrivateRoute from "../private/index.js";

const userRoutes = [
    {
        path: "/user/",
        element: (
            <PrivateRoute allowedRoles={["employee"]}>
                <Index />
            </PrivateRoute>
        ),
        children: [
            {
                path: "",
                element: <Navigate replace to="dashboard" />
            },
            {
                path: "dashboard",
                element: <div>User Dashboard</div>
            }
        ]
    }
]

export default userRoutes;