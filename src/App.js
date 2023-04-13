import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getFeed } from './services/actions'
import './App.css'
import AppHeader from './components/appheader/appheader'
import Modal from './components/modal/modal'
//import BurgerIngredients from './components/burgeringredients/burgeringredients'
//import BurgerConstructor from './components/burgerconstructor/burgerconstructor'
//import { HTML5Backend } from 'react-dnd-html5-backend'
//import { DndProvider } from 'react-dnd'
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
} from './pages'
import { ProtectedRouteElement } from './components/protected-route'
import { ModalContent } from './components/ingredientdetails/ingredientdetails'
//import { getUserInfo } from './services/actions/userinfo'
//import { getAToken } from './utils/helperfunctions'
//import { ProvideAuth } from "./services/auth";

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  //const { ingredientId } = useParams()
  const background = location.state && location.state.background

  //const handleModalClose = () => { navigate(-1) }
  // Возвращаемся к предыдущему пути при закрытии модалки

  const { feed, feedRequest, feedFailed } = useSelector((state) => state.feed)
  //const userLoggedIn = useSelector((state) => state.loginReducer.isLoggedIn)
  const dispatch = useDispatch()

  /*const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('a_token'),
    },
  }*/

  useEffect(() => {
    if (!feed.length) dispatch(getFeed())
  }, [feed.length, dispatch])

  /*useEffect(() => {
    if (!userLoggedIn) {
      dispatch(getUserInfo({ options }))
    } else console.log('User logged in!')
  }, [userLoggedIn, dispatch])*/

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1)
  }

  return (
    <>
      {/*<ProvideAuth> location={background || location}*/}
      <AppHeader />
      {feedRequest && 'Загрузка данных...'}
      {feedFailed && 'Произошла ошибка при получении данных'}
      {!feedRequest && !feedFailed && feed.length && (
        <Routes location={background || location}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              //<LoginPage />
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
              <ProtectedRouteElement
                onlyUnAuth={true}
                element={<ResetPasswordPage />}
              />
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
          <Route
            path="/ingredients/:ingredientId"
            element={<ModalContent directLink={true} />}
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

      {/*</ProvideAuth>*/}
    </>
  )
}

export default App
