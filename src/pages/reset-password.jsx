import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './reset-password.module.css'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../components/input'
import { PasswordInput } from '../components/password-input'
import { getPasswordResetConfirmed } from '../services/actions/resetpassword'

export function ResetPasswordPage() {
  const codeCorrect = useSelector(
    (state) => state.resetPasswordReducer.isCodeCorrect
  )
  const [form, setValue] = useState({ password: '', code: '' })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  localStorage.removeItem('reset_key')

  useEffect(() => {
    if (codeCorrect) {
      navigate('/login')
    }
  }, [navigate, codeCorrect])

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      password: form.password,
      token: form.code,
    }),
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(getPasswordResetConfirmed({ options }))
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
            <Button htmlType="submit" type="primary" size="large">
              Сохранить
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
