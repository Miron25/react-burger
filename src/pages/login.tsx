import { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styles from './login.module.css'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { getAuth } from '../services/actions/authorization'
import { Input } from '../components/input'
import { PasswordInput } from '../components/password-input'
import { IForm } from '.'

export function LoginPage() {
  const navigate = useNavigate()
  const [form, setValue] = useState<IForm>({ email: '', password: '' })
  //@ts-ignore: Will be typed in the next sprint
  const userLoggedIn = useSelector((state) => state.loginReducer.user)
  const dispatch = useDispatch()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    //@ts-ignore: Will be typed later
    dispatch(getAuth({ options }))
  }

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
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
          <Button htmlType="submit" type="primary" size="large">
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
