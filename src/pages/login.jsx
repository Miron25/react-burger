import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styles from './login.module.css'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { getAuth } from '../services/actions/authorization'
import { Input } from '../components/input'
import { PasswordInput } from '../components/password-input'

export function LoginPage() {
  const navigate = useNavigate()
  const [form, setValue] = useState({ email: '', password: '' })
  const userLoggedIn = useSelector((state) => state.loginReducer.user)
  const dispatch = useDispatch()

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('a_token'),
    },
    body: JSON.stringify({
      email: form.email,
      password: form.password,
    }),
  }

  useEffect(() => {
    if (userLoggedIn) {
      navigate('/')
    }
  }, [navigate, userLoggedIn])

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form}>
          <div className={styles.heading}>
            <h1 className="text text_type_main-medium pb-6">Вход</h1>
          </div>
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
              dispatch(getAuth({ options }))
            }}
          >
            Войти
          </Button>
        </form>
        <div className={styles.additional_actions}>
          <div className={styles.registr}>
            <span className="text text_type_main-default text_color_inactive">
              Вы - новый пользователь?
            </span>
            <Link
              to="/register"
              className="text text_type_main-default"
              style={{ color: '#4C4CFF' }}
            >
              Зарегистрироваться
            </Link>
          </div>
          <div className={styles.registr}>
            <span className="text text_type_main-default text_color_inactive">
              Забыли пароль?
            </span>
            <Link
              to="/forgot-password"
              className="text text_type_main-default"
              style={{ color: '#4C4CFF' }}
            >
              Восстановить пароль
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
