import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Blog from "./pages/Blog"
import Layout from "./pages/Layout"
import Home from "./pages/Home"

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='blog' element={<Blog />} />
      </Route>
    )
  )

  return (
    <div className="min-h-screen bg-[#1E1F21]">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
