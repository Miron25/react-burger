//import React, { useEffect } from 'react'
//import { useSelector, useDispatch } from 'react-redux'
//import { getFeed } from './services/actions'
import './App.css'
//import AppHeader from './components/appheader/appheader'
//import BurgerIngredients from './components/burgeringredients/burgeringredients'
//import BurgerConstructor from './components/burgerconstructor/burgerconstructor'
//import { HTML5Backend } from 'react-dnd-html5-backend'
//import { DndProvider } from 'react-dnd'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage, NotFound404, LoginPage } from './pages'
//import { ProtectedRouteElement } from "./components/protected-route";
//import { ProvideAuth } from "./services/auth";

function App() {
  // const { feed, feedRequest, feedFailed } = useSelector((state) => state.feed)
  //const dispatch = useDispatch()

  // useEffect(() => {
  //   if (!feed.length) dispatch(getFeed())
  // }, [feed.length, dispatch])

  return (
    <>
      {/*<ProvideAuth>*/}
      <BrowserRouter>
        <Routes>
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
          <Route path="/login" element={<LoginPage />} />
          {/*<Route path="/list" element={<ProtectedRouteElement element={<ListPage />} />}/>
          <Route path="/list/:country" element={<ProtectedRouteElement element={<CountryPage />} />}/>
  <Route path="/list/:country/:personId" element={<ProtectedRouteElement element={<PersonPage />} />} /> */}
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </BrowserRouter>
      {/*</ProvideAuth>*/}
    </>
  )
}

export default App
