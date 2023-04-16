import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import AppheaderStyles from './appheader.module.css'

const AccountLink = () => {
  const userLoggedIn = useSelector((state) => state.loginReducer.isLoggedIn)
  const location = useLocation()
  const setActive = ({ isActive }) =>
    isActive
      ? 'text text_type_main-default'
      : 'text text_type_main-default text_color_inactive'
  useEffect(() => {}, [userLoggedIn])

  return (
    <div className={AppheaderStyles.accbox}>
      {!userLoggedIn ? (
        <>
          <ProfileIcon
            type={location.pathname === '/login' ? 'primary' : 'secondary'}
          />
          <NavLink to="/login" className={setActive}>
            Личный кабинет
          </NavLink>
        </>
      ) : (
        <>
          <ProfileIcon
            type={location.pathname === '/profile' ? 'primary' : 'secondary'}
          />
          <NavLink to="/profile" end className={setActive}>
            Профиль
          </NavLink>
        </>
      )}
    </div>
  )
}

const NavMenu = () => {
  const setActive = ({ isActive }) =>
    isActive
      ? 'text text_type_main-default'
      : 'text text_type_main-default text_color_inactive'

  return (
    <div className={AppheaderStyles.navmenu}>
      <>
        <BurgerIcon
          type={location.pathname === '/' ? 'primary' : 'secondary'}
        />
        <NavLink to="/" className={setActive}>
          Конструктор
        </NavLink>

        <ListIcon
          type={location.pathname === '/feed' ? 'primary' : 'secondary'}
        />
        <NavLink to="/feed" className={setActive}>
          Лента заказов
        </NavLink>
      </>
    </div>
  )
}

function AppHeader() {
  return (
    <nav className={AppheaderStyles.navpane}>
      <div className={AppheaderStyles.content}>
        {
          <>
            <NavMenu />
            <NavLink to="/">
              <Logo styles={{ alignSelf: 'center' }} />
            </NavLink>
            <AccountLink />
          </>
        }
      </div>
    </nav>
  )
}

export default AppHeader
