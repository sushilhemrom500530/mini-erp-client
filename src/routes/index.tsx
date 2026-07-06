import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/main/index.js";
import Index from "../view/error-page/index.js";
import authRoutes from "./auth/index.js";
import adminRoutes from './admin/index.jsx';
import userRoutes from './user/index.js';
import HomePage from "../view/home/index.js";

const routes = [

    // common home page route 
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <Index />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
        ]
    },
    {
        path: "*",
        element: <Index />
    },
    ...authRoutes,
    ...adminRoutes,
    ...userRoutes,
]

const router = createBrowserRouter(
    routes
);

export default router;
