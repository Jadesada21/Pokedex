import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/home"
import DetailPage from "./pages/detail"

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/detail/:name',
      element: <DetailPage />,
    },
  ])

  return (
    <div className="bg-[url('/list_bg.webp')] min-h-screen bg-contain bg-top m-auto w-full ">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
