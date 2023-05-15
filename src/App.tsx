import { useEffect } from 'react'
import { useSelector, useDispatch } from './services/types/hooks'
import { getFeed } from './services/actions'
import './App.css'
import AppHeader from './components/appheader/appheader'
import Modal from './components/modal/modal'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import {
  HomePage,
  NotFound404,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  ProfileOrdersPage,
  OrdersFeedPage,
} from './pages'
import { ProtectedRouteElement } from './components/protected-route'
import { ModalContent } from './components/ingredientdetails/ingredientdetails'
import { getAuthSuccessAction } from './services/actions/authorization'
import { OrderDetails } from './pages/orderdetail'

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const background = location.state && location.state.background
  const { feed, feedRequest, feedFailed } = useSelector((state) => state.feed)
  const dispatch = useDispatch()
  const resetKey = localStorage.getItem('reset_key')

  useEffect(() => {
    if (!feed.length) {
      dispatch(getFeed())
    }
  }, [feed.length, dispatch])

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user')
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser)
      dispatch(getAuthSuccessAction(foundUser, true))
    }
  }, [])

  const handleModalClose = (): void => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1)
  }

  return (
    <>
      <AppHeader />
      {feedRequest && 'Загрузка данных...'}
      {feedFailed && 'Произошла ошибка при получении данных'}
      {!feedRequest && !feedFailed && feed.length && (
        <Routes location={background || location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/feed" element={<OrdersFeedPage />} />
          <Route path="/feed/:feedId" element={<OrderDetails />} />
          <Route
            path="/ingredients/:ingredientId"
            element={<ModalContent directLink={true} />}
          />
          <Route
            path="/login"
            element={
              <ProtectedRouteElement
                onlyUnAuth={true}
                element={<LoginPage />}
              />
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRouteElement
                onlyUnAuth={true}
                element={<RegisterPage />}
              />
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRouteElement
                onlyUnAuth={true}
                element={<ForgotPasswordPage />}
              />
            }
          />
          <Route
            path="/reset-password"
            element={
              resetKey && (
                <ProtectedRouteElement
                  onlyUnAuth={true}
                  element={<ResetPasswordPage />}
                />
              )
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                onlyUnAuth={false}
                element={<ProfilePage />}
              />
            }
          />
          <Route
            path="/profile/orders"
            element={
              <ProtectedRouteElement
                onlyUnAuth={false}
                element={<ProfileOrdersPage />}
              />
            }
          />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      )}

      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal show={true} onClose={handleModalClose}>
                <ModalContent directLink={false} />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  )
}

export default App
