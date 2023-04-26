import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FC } from 'react'
import { IPrRootProps } from '../utils/types'

export const ProtectedRouteElement: FC<IPrRootProps> = ({
  onlyUnAuth = false,
  element,
}) => {
  //@ts-ignore: Will be typed in the next sprint
  const user = useSelector((state) => state.loginReducer.user)
  const location = useLocation()

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
