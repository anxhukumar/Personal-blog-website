import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Blog from "./pages/Blog"
import Layout from "./pages/Layout"
import Home from "./pages/Home"
import AdminLayout from "./pages/admin pages/AdminLayout"
import Login from "./pages/admin pages/Login"
import Signup from "./pages/admin pages/Signup"
import AdminHome from "./pages/admin pages/AdminHome"

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='blog' element={<Blog />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path='admin' element={<AdminHome />} />
          <Route path='admin/login' element={<Login />} />
          <Route path='admin/signup' element={<Signup />} />
        </Route>
      </>  
    )
  )

  return (
    <div className="min-h-screen">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
