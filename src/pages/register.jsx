import { useCallback, useState } from 'react'
//import { Navigate } from 'react-router-dom'
import AppHeader from '../components/appheader/appheader'
import styles from './register.module.css'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'

//import { useAuth } from '../services/auth'
//import { Button } from '../components/button'
import { Input } from '../components/input'
import { PasswordInput } from '../components/password-input'

export function RegisterPage() {
  // let auth = useAuth()

  const [form, setValue] = useState({ email: '', password: '' })

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
              <h1 className="text text_type_main-medium pb-6">Регистрация</h1>
            </div>
            <Input
              placeholder="Имя"
              value={form.name}
              name="name"
              onChange={onChange}
            />
            <Input
              placeholder="E-mail"
              value={form.email}
              name="email"
              onChange={onChange}
            />
            <PasswordInput
              placeholder="Пароль"
              value={form.password}
              name="password"
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
              Зарегистрироваться
            </Button>
          </form>
          <div className={styles.additional_actions}>
            <div className={styles.registr}>
              <span className="text text_type_main-default text_color_inactive">
                Уже зарегистрированы?
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
