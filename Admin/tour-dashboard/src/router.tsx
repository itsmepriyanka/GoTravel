import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/Home";
import RegisterPage from "@/pages/Register";
import LoginPage from "@/pages/Login";
import PlacesPage from "./pages/PlacesPage";
import DashboardLayout from "./layouts/dashboard";
import AuthLayout from "./layouts/AuthLayout";

export const router = createBrowserRouter([
    {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
            {
                path: 'Home',
                element: <HomePage />
            },
            {
                path: 'Places',
                element: <PlacesPage />
            },
        ]
    },
    {
        path: '/Auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'Login',
                element: <LoginPage />
            },
            {
                path: 'Register',
                element: <RegisterPage />
            },

        ]
    },

]);