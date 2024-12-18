import { Navigate, Outlet, useRoutes } from "react-router-dom"
import RegisterLayout from "./layouts/RegisterLayout"
import MainLayout from "./layouts/MainLayout"
import { lazy, Suspense, useContext } from "react"
import { AppContext } from "./contexts/app.context"
import path from "src/constants/path"
import CartLayout from "./layouts/CartLayout"
import UserLayout from "./pages/User/layouts/UserLayout"

const Login = lazy(() => import('./pages/Login'))
const ProductList = lazy(() => import('./pages/ProductList'))
const Profile = lazy(() => import('./pages/User/pages/Profile'))
const Register = lazy(() => import('./pages/Register'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))
const ChangePassword = lazy(() => import('./pages/User/pages/ChangePassword'))
const HistoryPurchase = lazy(() => import('./pages/User/pages/HistoryPurchase'))
const NotFound = lazy(() => import('./pages/NotFound'))
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
          <Suspense>
            <ProductList />
          </Suspense>
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
              <Suspense>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense>
                <Register />
              </Suspense>

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
              <Suspense>
                <Cart />
              </Suspense>
            </CartLayout>
          )
        }
      ]
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <Suspense>
            <ProductDetail />
          </Suspense>
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
          element: (
            <Suspense>
              <Profile />
            </Suspense>
          )
        },
        {
          path: path.changePassword,
          element: (
            <Suspense>
              <ChangePassword />
            </Suspense>
          )
        },
        {
          path: path.historyPurchase,
          element: (
            <Suspense>
              <HistoryPurchase />
            </Suspense>
          )
        }
      ]
    },
    {
      path: "*",
      element: (
        <MainLayout>
          <Suspense></Suspense>
          <NotFound />
        </MainLayout>
      )
    }
  ])
  return routeElements
}