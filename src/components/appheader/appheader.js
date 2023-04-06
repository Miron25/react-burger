//import React from 'react'
import { useSelector } from 'react-redux'
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import AppheaderStyles from './appheader.module.css'
import { Link } from 'react-router-dom'

const AccountLink = () => {
  const userLoggedIn = useSelector((state) => state.loginReducer.isLoggedIn)
  return (
    <div className={AppheaderStyles.accbox}>
      <ProfileIcon type="secondary" />
      {!userLoggedIn ? (
        <Link
          to="/login"
          className="text text_type_main-default text_color_inactive"
        >
          Личный кабинет
        </Link>
      ) : (
        <Link
          to="/profile"
          className="text text_type_main-default text_color_inactive"
        >
          Профиль
        </Link>
      )}
    </div>
  )
}

const NavMenu = () => {
  return (
    <div className={AppheaderStyles.navmenu}>
      <BurgerIcon type="primary" />
      <a
        href="https://"
        className="text text_type_main-default"
        target={'_blank'}
        rel="noopener, noreferrer"
      >
        Конструктор
      </a>
      <ListIcon type="secondary" />
      <a
        href="https://"
        className="text text_type_main-default text_color_inactive"
        target={'_blank'}
        rel="noopener, noreferrer"
      >
        Лента заказов
      </a>
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
            <Logo styles={{ alignSelf: 'center' }} />
            <AccountLink />
          </>
        }
      </div>
    </nav>
  )
}

export default AppHeader
