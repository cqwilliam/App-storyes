import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../Home"
import Login from "../Login"
import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route index element={<Login />} />
          {/* <Route path="registro" element={<Register />} /> */}
          {/* <Route path="recuperar" element={<RecoverAccount />} /> */}
          {/* <Route path="restablecer" element={<ResetPassword />} /> */}
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home/>} />
        </Route>

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  )
}