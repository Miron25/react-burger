//import { useState } from 'react'
//import { Navigate } from 'react-router-dom'
import AppHeader from '../components/appheader/appheader'
import styles from './profile.module.css'
import { EditIcon } from '@ya.praktikum/react-developer-burger-ui-components'

//import { useAuth } from '../services/auth'
//import { Button } from '../components/button'
//import { Input } from '../components/input'
//import { PasswordInput } from '../components/password-input'

export function ProfilePage() {
  // let auth = useAuth()

  //const [form, setValue] = useState({ email: '', password: '' })

  /*const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  let login = useCallback(
    (e) => {
      e.preventDefault()
      // auth.signIn(form)
    },
    []
    // [auth, form]
  )*/

  // if (auth.user) {
  //   return <Navigate to={'/'} />
  // }

  return (
    <>
      <AppHeader />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.frame}>
            <span className="text text_type_main-medium">Профиль</span>
          </div>
          <div className={styles.frame}>
            <span className="text text_type_main-medium text_color_inactive">
              История заказов
            </span>
          </div>
          <div className={styles.frame}>
            <span className="text text_type_main-medium text_color_inactive">
              Выход
            </span>
          </div>
        </div>
        <div className={styles.caption}>
          <span className="text text_type_main-default text_color_inactive">
            В этом разделе вы можете изменить свои персональные данные
          </span>
        </div>
        <div className={styles.form}>
          <div className={styles.info_block}>
            <div>
              <p className="text text_type_main-default text_color_inactive">
                Имя
              </p>
              <p className="text text_type_main-default text_color_inactive">
                Марк
              </p>
            </div>
            <span className={styles.icon}>
              <EditIcon />
            </span>
          </div>
          <div className={styles.info_block}>
            <div>
              <p className="text text_type_main-default text_color_inactive">
                Логин
              </p>
              <p className="text text_type_main-default text_color_inactive">
                mail@stellar.burgers
              </p>
            </div>
            <span className={styles.icon}>
              <EditIcon />
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
            <span className={styles.icon}>
              <EditIcon />
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
