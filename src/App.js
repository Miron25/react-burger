import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getFeed } from './services/actions'
import './App.css'
import AppHeader from './components/appheader/appheader'
//import BurgerIngredients from './components/burgeringredients/burgeringredients'
//import BurgerConstructor from './components/burgerconstructor/burgerconstructor'
//import { HTML5Backend } from 'react-dnd-html5-backend'
//import { DndProvider } from 'react-dnd'
import { Routes, Route, useLocation } from 'react-router-dom'
import {
  HomePage,
  NotFound404,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
} from './pages'
import { ProtectedRouteElement } from './components/protected-route'
import { ModalContent } from './components/ingredientdetails/ingredientdetails'
//import { ProvideAuth } from "./services/auth";

function App() {
  const location = useLocation()
  //const navigate = useNavigate()
  const background = location.state && location.state.background

  //const handleModalClose = () => { navigate(-1) }
  // Возвращаемся к предыдущему пути при закрытии модалки

  const { feed, feedRequest, feedFailed } = useSelector((state) => state.feed)
  // const userLoggedIn = useSelector((state) => state.loginReducer.isLoggedIn)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!feed.length) dispatch(getFeed())
  }, [feed.length, dispatch])

  return (
    <>
      {/*<ProvideAuth> location={background || location}*/}
      <AppHeader />
      {feedRequest && 'Загрузка данных...'}
      {feedFailed && 'Произошла ошибка при получении данных'}
      {!feedRequest && !feedFailed && feed.length && (
        <Routes location={background || location}>
          <Route path="/" element={<HomePage />} />
          {/*} <React.Fragment>
              <div id="root">
                <AppHeader />
                {feedRequest && 'Загрузка данных...'}
                {feedFailed && 'Произошла ошибка при получении данных'}
                {!feedRequest && !feedFailed && feed.length && (
                  <>
                    <DndProvider backend={HTML5Backend}>
                      <BurgerIngredients />
                      <BurgerConstructor />
                    </DndProvider>
                  </>
                )}
              </div>
                </React.Fragment>*/}
          <Route
            path="/login"
            element={
              <LoginPage />
              //<ProtectedRouteElement
              // onlyUnAuth={true}
              // element={<LoginPage />}
              ///>
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
          <Route path="/reset-password" element={<ResetPasswordPage />} />
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
            path="/ingredients/:ingredientId"
            element={<ModalContent id={'60666c42cc7b410027a1a9b9'} />}
          />
          {/*<Route path="/list" element={<ProtectedRouteElement element={<ListPage />} />}/>
          <Route path="/list/:country" element={<ProtectedRouteElement element={<CountryPage />} />}/>
  <Route path="/list/:country/:personId" element={<ProtectedRouteElement element={<PersonPage />} />} /> */}
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      )}

      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              //<Modal onClose={handleModalClose}>
              <ModalContent />
              // </Modal>
            }
          />
        </Routes>
      )}

      {/*</ProvideAuth>*/}
    </>
  )
}

export default App
