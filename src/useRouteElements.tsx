import { Navigate, Outlet, useRoutes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import RegisterLayout from "./layouts/RegisterLayout"
import MainLayout from "./layouts/MainLayout"
import Profile from "./pages/User/pages/Profile"
import { useContext } from "react"
import { AppContext } from "./contexts/app.context"
import path from "src/constants/path"
import ProductList from "./pages/ProductList"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import CartLayout from "./layouts/CartLayout"
import UserLayout from "./pages/User/layouts/UserLayout"
import ChangePassword from "./pages/User/pages/ChangePassword"
import HistoryPurchase from "./pages/User/pages/HistoryPurchase"
import NotFound from "./pages/NotFound"

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        }
      ]
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: path.user,
      element: (
        <MainLayout>
          <UserLayout />
        </MainLayout>
      ),
      children: [
        {
          path: path.profile,
          element: <Profile />
        },
        {
          path: path.changePassword,
          element: <ChangePassword />
        },
        {
          path: path.historyPurchase,
          element: <HistoryPurchase />
        }
      ]
    },
    {
      path: "*",
      element: (
        <MainLayout>
          <NotFound />
        </MainLayout>
      )
    }
  ])
  return routeElements
}