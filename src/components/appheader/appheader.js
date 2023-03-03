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
      <a
        href="https://"
        className="text text_type_main-default text_color_inactive"
        target={'_blank'}
        rel="noopener, noreferrer"
      >
        Личный кабинет
      </a>
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
