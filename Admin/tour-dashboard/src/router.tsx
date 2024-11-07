import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/Home";
import RegisterPage from "@/pages/Register";
import LoginPage from "@/pages/Login";
import DashboardLayout from "./layouts/dashboard";
import PlacesPage from "./pages/PlacesPage";

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
        path: '/Login',
        element: <LoginPage />
    },
    {
        path: '/Register',
        element: <RegisterPage />
    },
]);