import { useState, ChangeEvent, FormEvent } from 'react'
import { useDispatch } from '../services/types/hooks'
import styles from './forgot-password.module.css'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../components/input'
import { getPasswordReset } from '../services/actions/forgotpassword'
import { IForm } from '../services/types/data'

export function ForgotPasswordPage() {
  const navigate = useNavigate()

  const [form, setValue] = useState<IForm>({ email: '' })
  const dispatch = useDispatch()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  const options: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: form.email,
    }),
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    localStorage.setItem('reset_key', 'true')
    dispatch(getPasswordReset({ options }))
    navigate('/reset-password')
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.heading}>
              <h1 className="text text_type_main-medium pb-6">
                Восстановление пароля
              </h1>
            </div>
            <Input
              placeholder="Укажите e-mail"
              value={form.email}
              name="email"
              onChange={onChange}
            />
            <Button htmlType="submit" type="primary" size="large">
              Восстановить
            </Button>
          </form>
          <div className={styles.additional_actions}>
            <div className={styles.registr}>
              <span className="text text_type_main-default text_color_inactive">
                Вспомнили пароль?
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
