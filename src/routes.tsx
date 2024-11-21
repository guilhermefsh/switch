import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/public-routes/auth/login";

export const router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                path: '/login',
                element: <Login />,
            }
        ]
    }
])