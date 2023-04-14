import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styles from './register.module.css'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { getRegistration } from '../services/actions/registration'
import { Input } from '../components/input'
import { PasswordInput } from '../components/password-input'

export function RegisterPage() {
  const userRegistered = useSelector((state) => state.registrationReducer.user)
  const [form, setValue] = useState({ name: '', email: '', password: '' })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (userRegistered) {
      navigate('/')
    }
  }, [navigate, userRegistered])

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      password: form.password,
    }),
  }

  return (
    <>
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
              required
            />
            <Input
              placeholder="E-mail"
              value={form.email}
              name="email"
              onChange={onChange}
              required
            />
            <PasswordInput
              placeholder="Пароль"
              value={form.password}
              name="password"
              onChange={onChange}
              required
            />
            <Button
              htmlType="button"
              type="primary"
              size="large"
              onClick={() => {
                dispatch(getRegistration({ options }))
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
              <Link
                to="/login"
                className="text text_type_main-default"
                style={{ color: '#4C4CFF' }}
              >
                Войти
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
