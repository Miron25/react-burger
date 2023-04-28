import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styles from './register.module.css'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { getRegistration } from '../services/actions/registration'
import { getAuth } from '../services/actions/authorization'
import { Input } from '../components/input'
import { PasswordInput } from '../components/password-input'
import { IForm } from '.'

export function RegisterPage() {
  //@ts-ignore: Will be typed in the next sprint
  const userRegistered = useSelector((state) => state.registrationReducer.user)
  const [form, setValue] = useState<IForm>({
    name: '',
    email: '',
    password: '',
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (userRegistered) {
      //@ts-ignore: Will be typed later
      dispatch(getAuth({ options }))
      navigate('/')
    }
  }, [navigate, userRegistered])

  const options_1 = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      password: form.password,
    }),
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

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    //@ts-ignore: Will be typed later
    dispatch(getRegistration({ options_1 }))
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.form}>
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
            <Button htmlType="submit" type="primary" size="large">
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
