import { useState, useEffect } from 'react'
import './App.css'
import AppHeader from './components/appheader/appheader'
import BurgerIngredients from './components/burgeringredients/burgeringredients'
import BurgerConstructor from './components/burgerconstructor/burgerconstructor'

function App() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    mainArray: [],
  })

  const checkReponse = (res: any) => {
    return res.ok
      ? res.json()
      : res.json().then((err: any) => Promise.reject(err))
  }

  useEffect(() => {
    const getIngredients = async () => {
      try {
        setState({ ...state, hasError: false, isLoading: true })
        const response = await fetch(
          'https://norma.nomoreparties.space/api/ingredients'
        )
        const data = await checkReponse(response)
        setState({ ...state, mainArray: data.data, isLoading: false })
      } catch (exception) {
        console.log(exception)
        setState({ ...state, hasError: true, isLoading: false })
      }
    }
    getIngredients()
  }, [])

  return (
    <>
      <div id="root">
        <AppHeader />
        {state.isLoading && 'Загрузка данных...'}
        {state.hasError && 'Произошла ошибка загрузки данных'}
        {!state.isLoading && !state.hasError && state.mainArray.length && (
          <>
            <BurgerIngredients mainArray={state.mainArray} />
            <BurgerConstructor mainArray={state.mainArray} />
          </>
        )}
      </div>
    </>
  )
}

export default App
