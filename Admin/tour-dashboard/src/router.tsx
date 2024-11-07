import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/login";
import HomePage from "@/pages/Home";

export const router = createBrowserRouter([
    {
        path: '/Home',
        element: <HomePage />
    },
    {
        path: '/',
        element: <LoginPage />
    },
]);