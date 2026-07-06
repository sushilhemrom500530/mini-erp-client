import { Navigate } from "react-router-dom";
import Login from "../../view/auth/login/index.js";
import SignUp from "../../view/auth/signup/index.js";
import AuthLayout from "../../layout/auth/index.js";
import ForgotPassword from "../../view/auth/forgot-password/index.js";
import VerifyOtp from "../../view/auth/verify-otp/index.js";
import ResetPassword from "../../view/auth/reset-password/index.js";

const authRoutes = [
    {
        path: "/auth/",
        element: <AuthLayout />,
        children: [
            {
                path: "",
                element: <Navigate replace to="login" />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <SignUp />
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "verify-otp",
                element: <VerifyOtp />
            },
            {
                path: "reset-password",
                element: <ResetPassword />
            }
        ]
    }
]

export default authRoutes;