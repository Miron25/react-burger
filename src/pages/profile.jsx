import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './profile.module.css'
import {
  EditIcon,
  Button,
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { getUserInfo, getUserUpdate } from '../services/actions/userinfo'
import { getLogout } from '../services/actions/logout'
import { NavLink } from 'react-router-dom'

export function ProfilePage() {
  const userLoggedIn = useSelector((state) => state.loginReducer.isLoggedIn)
  const userInProfile = useSelector((state) => state.userInfoReducer.user)
  const [editBox1, setEditBox1] = useState(false)
  const [editBox2, setEditBox2] = useState(false)
  const [editBox3, setEditBox3] = useState(false)
  const nameEdit = useRef(null)
  const emailEdit = useRef(null)
  const passwordEdit = useRef(null)
  const [form, setValue] = useState({ email: '', name: '', password: '' })
  const dispatch = useDispatch()
  const setActive = ({ isActive }) =>
    isActive
      ? 'text text_type_main-medium'
      : 'text text_type_main-medium text_color_inactive'

  useEffect(() => {
    editBox1 && nameEdit.current?.focus()
  }, [editBox1])

  useEffect(() => {
    editBox2 && emailEdit.current?.focus()
  }, [editBox2])

  useEffect(() => {
    editBox3 && passwordEdit.current?.focus()
  }, [editBox3])

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('a_token'),
    },
  }

  const options2 = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: localStorage.getItem('r_token'),
    }),
  }

  const patchOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('a_token'),
    },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      password: form.password,
    }),
  }

  useEffect(() => {
    if (userLoggedIn && !userInProfile) {
      dispatch(getUserInfo({ options }))
    }
    if (userInProfile) {
      setValue({
        ...form,
        name: userInProfile.name,
        email: userInProfile.email,
        password: userInProfile.password,
      })
    }
  }, [userLoggedIn, userInProfile])

  const handleKeyDown = () => {}

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
                className={
                  editBox1 ? styles.info_block_edit : styles.info_block
                }
              >
                <div>
                  <p className="text text_type_main-default text_color_inactive">
                    Имя
                  </p>
                  {editBox1 ? (
                    <input
                      type="text"
                      ref={nameEdit}
                      className={`${
                        styles.input
                      } ${'text text_type_main-default'}`}
                      placeholder={userInProfile && userInProfile.name}
                      onChange={() => {
                        setValue({
                          ...form,
                          name: nameEdit.current.value,
                        })
                      }}
                    ></input>
                  ) : (
                    <p className="text text_type_main-default text_color_inactive">
                      {userInProfile && userInProfile.name}
                    </p>
                  )}
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
              <div
                className={
                  editBox2 ? styles.info_block_edit : styles.info_block
                }
              >
                <div>
                  <p className="text text_type_main-default text_color_inactive">
                    Логин
                  </p>
                  {editBox2 ? (
                    <input
                      type="text"
                      ref={emailEdit}
                      className={`${
                        styles.input
                      } ${'text text_type_main-default'}`}
                      placeholder={userInProfile && userInProfile.email}
                      onChange={() => {
                        setValue({
                          ...form,
                          email: emailEdit.current.value,
                        })
                      }}
                    ></input>
                  ) : (
                    <p className="text text_type_main-default text_color_inactive">
                      {userInProfile && userInProfile.email}
                    </p>
                  )}
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
            </div>
            <div
              className={editBox3 ? styles.info_block_edit : styles.info_block}
            >
              <div>
                <p className="text text_type_main-default text_color_inactive">
                  Пароль
                </p>
                {editBox3 ? (
                  <input
                    type="text"
                    ref={passwordEdit}
                    className={`${
                      styles.input
                    } ${'text text_type_main-default'}`}
                    placeholder="******"
                    onChange={() => {
                      setValue({
                        ...form,
                        password: passwordEdit.current.value,
                      })
                    }}
                  ></input>
                ) : (
                  <p className="text text_type_main-default text_color_inactive">
                    ******
                  </p>
                )}
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
            {(editBox1 || editBox2 || editBox3) && (
              <div className={styles.actions}>
                <Button
                  htmlType="button"
                  type="secondary"
                  size="large"
                  onClick={() => {
                    setEditBox1(false)
                    setEditBox2(false)
                    setEditBox3(false)
                  }}
                >
                  Отмена
                </Button>
                <Button
                  htmlType="button"
                  type="primary"
                  size="large"
                  onClick={() => {
                    setEditBox1(false)
                    setEditBox2(false)
                    setEditBox3(false)
                    dispatch(getUserUpdate({ patchOptions }))
                  }}
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
