//import { useNavigate } from 'react-router-dom'

//import styles from './home.module.css'
import { useEffect } from 'react'
import AppHeader from '../components/appheader/appheader'
import styles from '../App.css'
import BurgerIngredients from '../components/burgeringredients/burgeringredients'
import BurgerConstructor from '../components/burgerconstructor/burgerconstructor'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
//import { Button } from '../components/button'
import { useSelector, useDispatch } from 'react-redux'
import { getFeed } from '../services/actions'

export function HomePage() {
  //const navigate = useNavigate()
  const { feed, feedRequest, feedFailed } = useSelector((state) => state.feed)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!feed.length) dispatch(getFeed())
  }, [feed.length, dispatch])

  //const onClick = () => {const initialBreadcrumb = [{ path: '/', url: '/', title: 'Home' }]
  //navigate('/list', { state: initialBreadcrumb })}

  return (
    <div id="root" className={styles.root}>
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
  )
}
