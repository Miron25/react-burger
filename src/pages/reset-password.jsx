import { useCallback, useState } from 'react'
//import { Navigate } from 'react-router-dom'
import AppHeader from '../components/appheader/appheader'
import styles from './reset-password.module.css'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'

//import { useAuth } from '../services/auth'
//import { Button } from '../components/button'
import { Input } from '../components/input'
import { PasswordInput } from '../components/password-input'

export function ResetPasswordPage() {
  // let auth = useAuth()

  const [form, setValue] = useState({ password: '', code: '' })

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  let login = useCallback(
    (e) => {
      e.preventDefault()
      // auth.signIn(form)
    },
    []
    // [auth, form]
  )

  // if (auth.user) {
  //   return <Navigate to={'/'} />
  // }

  return (
    <>
      <AppHeader />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <form className={styles.form}>
            <div className={styles.heading}>
              <h1 className="text text_type_main-medium pb-6">
                Восстановление пароля
              </h1>
            </div>
            <PasswordInput
              placeholder="Введите новый пароль"
              value={form.password}
              name="password"
              onChange={onChange}
            />
            <Input
              placeholder="Введите код из письма"
              value={form.code}
              name="code"
              onChange={onChange}
            />
            <Button
              htmlType="button"
              type="primary"
              size="large"
              onClick={() => {
                login
                //setShow(true)
                //dispatch({ type: CLEAR_ARRAY })
                //dispatch(getOrder({ options }))
              }}
            >
              Сохранить
            </Button>
          </form>
          <div className={styles.additional_actions}>
            <div className={styles.registr}>
              <span className="text text_type_main-default text_color_inactive">
                Вспомнили пароль?
              </span>
              <a
                href="https://"
                target={'_blank'}
                rel="noopener, noreferrer"
                className="text text_type_main-default"
                style={{ color: '#4C4CFF' }}
              >
                Войти
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
