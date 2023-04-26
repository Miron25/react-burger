import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
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
import { IForm } from '.'

export function ProfilePage() {
  //@ts-ignore: Will be typed in the next sprint
  const userLoggedIn = useSelector((state) => state.loginReducer.isLoggedIn)
  //@ts-ignore: Will be typed in the next sprint
  const userInProfile = useSelector((state) => state.userInfoReducer.user)
  const [editBox1, setEditBox1] = useState<boolean>(false)
  const [editBox2, setEditBox2] = useState<boolean>(false)
  const [editBox3, setEditBox3] = useState<boolean>(false)
  const [form, setValue] = useState<IForm>({})
  const dispatch = useDispatch()
  const setActive = ({ isActive }: { isActive: boolean }): string =>
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
      //@ts-ignore: Will be typed later
      dispatch(getUserInfo({ options }))
    }
  }, [dispatch, userLoggedIn, userInProfile])

  const handleKeyDown = (): void => {}

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setEditBox1(false)
    setEditBox2(false)
    setEditBox3(false)
    //@ts-ignore: Will be typed later
    dispatch(getUserUpdate({ patchOptions }))
    setValue({})
  }

  const handleReset = (event: FormEvent) => {
    event.preventDefault()
    setEditBox1(false)
    setEditBox2(false)
    setEditBox3(false)
    setValue({})
  }

  //userLoggedIn &&
  return (
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
                //@ts-ignore: Will be typed later
                dispatch(getLogout({ options2 }))
                localStorage.removeItem('user')
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
        <form
          onSubmit={handleSubmit}
          onReset={handleReset}
          className={styles.form}
        >
          <div
            className={editBox1 ? styles.info_block_edit : styles.info_block}
          >
            <div>
              <p className="text text_type_main-default text_color_inactive">
                Имя
              </p>
              {editBox1 ? (
                <input
                  type="text"
                  name="name"
                  value={form.name || ''}
                  className={`${styles.input} ${'text text_type_main-default'}`}
                  placeholder={userInProfile && userInProfile.name}
                  onChange={handleChange}
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
              {editBox1 ? (
                <CloseIcon type="primary" />
              ) : (
                <EditIcon type="primary" />
              )}
            </span>
          </div>
          <div
            className={editBox2 ? styles.info_block_edit : styles.info_block}
          >
            <div>
              <p className="text text_type_main-default text_color_inactive">
                Логин
              </p>
              {editBox2 ? (
                <input
                  type="text"
                  name="email"
                  value={form.email || ''}
                  className={`${styles.input} ${'text text_type_main-default'}`}
                  placeholder={userInProfile && userInProfile.email}
                  onChange={handleChange}
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
              {editBox2 ? (
                <CloseIcon type="primary" />
              ) : (
                <EditIcon type="primary" />
              )}
            </span>
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
                  type="password"
                  name="password"
                  className={`${styles.input} ${'text text_type_main-default'}`}
                  placeholder="******"
                  value={form.password || ''}
                  onChange={handleChange}
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
              {editBox3 ? (
                <CloseIcon type="primary" />
              ) : (
                <EditIcon type="primary" />
              )}
            </span>
          </div>
          {(editBox1 || editBox2 || editBox3) && (
            <div className={styles.actions}>
              <Button htmlType="reset" type="secondary" size="large">
                Отмена
              </Button>
              <Button htmlType="submit" type="primary" size="large">
                Сохранить
              </Button>
            </div>
          )}
        </form>
      </div>
    </React.Fragment>
  )
}
