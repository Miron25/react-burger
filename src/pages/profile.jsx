import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import { Navigate } from 'react-router-dom'
import styles from './profile.module.css'
import {
  EditIcon,
  Button,
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
//import { getAToken, getRToken } from '../utils/helperfunctions'
import { getUserInfo } from '../services/actions/userinfo'
//import { getToken } from '../services/actions/token'
import { getLogout } from '../services/actions/logout'
import { NavLink } from 'react-router-dom'
//import { Input } from '../components/input'
//import { NORMA_API } from '../utils/burger-api'

//import { useAuth } from '../services/auth'
//import { Button } from '../components/button'
//import { Input } from '../components/input'
//import { PasswordInput } from '../components/password-input'

export function ProfilePage() {
  const userLoggedIn = useSelector((state) => state.loginReducer.isLoggedIn)
  const userInProfile = useSelector((state) => state.userInfoReducer.user)
  const [editBox1, setEditBox1] = useState(false)
  const [editBox2, setEditBox2] = useState(false)
  const [editBox3, setEditBox3] = useState(false)
  // const [form, setValue] = useState({ email: '', name: '', password: '' })
  const dispatch = useDispatch()
  const setActive = ({ isActive }) =>
    isActive
      ? 'text text_type_main-medium'
      : 'text text_type_main-medium text_color_inactive'

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('a_token'),
    },
  }
  console.log(options)
  const options2 = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      //Authorization: JSON.parse(getAToken()),
    },
    body: JSON.stringify({
      token: localStorage.getItem('r_token'),
    }),
    //body: JSON.stringify({ token: JSON.parse(getRToken()) }), //{ token: localStorage.getItem('r_token')
    //}),
  }
  console.log(options2)

  useEffect(() => {
    //if (errorMessage === 'jwt expired') {
    //console.log('If condition')
    //dispatch(getToken({ tokref }))
    //} else {
    if (userLoggedIn && !userInProfile) {
      console.log('Checking user')
      dispatch(getUserInfo({ options }))
      //navigate('', { state: [...state, { path: pathname, url, title: countryTitle }], replace: true });
      //}
    }
  }, [userLoggedIn, userInProfile])

  const handleKeyDown = () => {}

  /*const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }*/

  /*const handleClick = () => {
    setEditMode((current) => !current)
    console.log(editMode)
    //className={styles.frame}
  }*/

  return (
    userLoggedIn && (
      <React.Fragment>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.frame}>
              <NavLink to="/profile" end className={setActive}>
                Профиль
              </NavLink>
            </div>
            <div className={styles.frame}>
              <NavLink to="/profile/orders" className={setActive}>
                История заказов
              </NavLink>
            </div>
            <div className={styles.frame}>
              <NavLink
                to="/login"
                className={setActive}
                onClick={() => {
                  dispatch(getLogout({ options2 }))
                }}
              >
                Выход
              </NavLink>
            </div>
          </div>
          <div className={styles.caption}>
            <span className="text text_type_main-default text_color_inactive">
              В этом разделе вы можете изменить свои персональные данные
            </span>
          </div>
          <div className={styles.form}>
            <div className={styles.form_inside}>
              <div
                className={editBox1 ? styles.info_block : styles.active_input}
              >
                <div>
                  <p className="text text_type_main-default text_color_inactive">
                    Имя
                  </p>
                  {/*editBox1 ? (*/}
                  <p className="text text_type_main-default text_color_inactive">
                    {userInProfile && userInProfile.name}
                  </p>
                  {/*}) : (
                    <Input
                      placeholder={userInProfile.name}
                      value={userInProfile.name}
                      name="name"
                      onChange={onChange}
                    />
                  )}*/}
                </div>
                <span
                  className={styles.icon}
                  onClick={() => {
                    setEditBox1(!editBox1)
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={handleKeyDown}
                >
                  {editBox1 ? <CloseIcon /> : <EditIcon />}
                </span>
              </div>
              <div className={styles.info_block}>
                <div>
                  <p className="text text_type_main-default text_color_inactive">
                    Логин
                  </p>
                  <p className="text text_type_main-default text_color_inactive">
                    {userInProfile && userInProfile.email}
                  </p>
                </div>
                <span
                  className={styles.icon}
                  onClick={() => {
                    setEditBox2(!editBox2)
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={handleKeyDown}
                >
                  {editBox2 ? <CloseIcon /> : <EditIcon />}
                </span>
              </div>
              <div className={styles.info_block}>
                <div>
                  <p className="text text_type_main-default text_color_inactive">
                    Пароль
                  </p>
                  <p className="text text_type_main-default text_color_inactive">
                    ******
                  </p>
                </div>
                <span
                  className={styles.icon}
                  onClick={() => {
                    setEditBox3(!editBox3)
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={handleKeyDown}
                >
                  {editBox3 ? <CloseIcon /> : <EditIcon />}
                </span>
              </div>
            </div>
            {(editBox1 || editBox2 || editBox3) && (
              <div className={styles.actions}>
                <Button
                  htmlType="button"
                  type="secondary"
                  size="large"
                  onClick={() => {}}
                >
                  Отмена
                </Button>
                <Button
                  htmlType="button"
                  type="primary"
                  size="large"
                  onClick={() => {}}
                >
                  Сохранить
                </Button>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    )
  )
}
