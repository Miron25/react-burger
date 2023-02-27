//import React from 'react'
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import AppheaderStyles from './appheader.module.css'

const AccountLink = () => {
  return (
    <div className={AppheaderStyles.accbox}>
      <ProfileIcon type="secondary" />
      <p className="text text_type_main-default text_color_inactive">
        Личный кабинет
      </p>
    </div>
  )
}

const NavMenu = () => {
  return (
    <div className={AppheaderStyles.navmenu}>
      <BurgerIcon type="primary" />
      <span className="text text_type_main-default">Конструктор</span>
      <ListIcon type="secondary" />
      <span className="text text_type_main-default text_color_inactive">
        Лента заказов
      </span>
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
