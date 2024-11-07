import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/Home";
import RegisterPage from "@/pages/Register";
import LoginPage from "@/pages/Login";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
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