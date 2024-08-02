import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import RegisterName from "../../pages/RegisterName";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { AuthProvider } from "../hooks/useAuth";


export const AppRouter = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route index element={<Login />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/hola" element={<RegisterName />} />
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
