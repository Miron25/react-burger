import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getFeed } from './services/actions'
import './App.css'
import AppHeader from './components/appheader/appheader'
import BurgerIngredients from './components/burgeringredients/burgeringredients'
import BurgerConstructor from './components/burgerconstructor/burgerconstructor'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

function App() {
  const { feed, feedRequest, feedFailed } = useSelector((state) => state.feed)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!feed.length) dispatch(getFeed())
  }, [feed.length, dispatch])

  return (
    <>
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
    </>
  )
}

export default App
