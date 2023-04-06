//import { useAuth } from "../services/auth";
import { Navigate, useLocation } from 'react-router-dom'
//import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

export const ProtectedRouteElement = ({ onlyUnAuth = false, element }) => {
  const isAuthChecked = useSelector((state) => state.loginReducer.isLoggedIn)
  const user = useSelector((state) => state.loginReducer.user)
  const location = useLocation()
  //let { getUser, ...auth } = useAuth()
  //const [isUserLoaded, setUserLoaded] = useState(false)

  /*const init = async () => {
    await userLoggedIn
    setUserLoaded(true)
  }

  useEffect(() => {
    init()
  }, [])

  if (!isUserLoaded) {
    return null
  }

  return isUserLoaded ? element : <Navigate to="/login" replace />
  //return element*/
  if (!isAuthChecked) {
    // Запрос еще выполняется
    return null
  }

  if (onlyUnAuth && user) {
    // Пользователь авторизован, но запрос предназначен только для неавторизованных пользователей
    // Нужно сделать редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: '/' } }
    return <Navigate to={from} />
  }

  if (!onlyUnAuth && !user) {
    // Сервер не ответил
    return <Navigate to="/login" state={{ from: location }} />
  }
  return element
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element,
  onlyUnAuth: PropTypes.bool,
}
