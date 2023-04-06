import { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
//import { Navigate } from 'react-router-dom'
import styles from './forgot-password.module.css'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
//import { useAuth } from '../services/auth'
//import { Button } from '../components/button'
import { Input } from '../components/input'
import {
  getPasswordReset,
  CLEAR_MESSAGE,
} from '../services/actions/forgotpassword'
//import { PasswordInput } from '../components/password-input'

export function ForgotPasswordPage() {
  const { message } = useSelector((state) => state.checkEmail)
  const navigate = useNavigate()
  // let auth = useAuth()

  const [form, setValue] = useState({ email: '' })
  const dispatch = useDispatch()

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  const goToResetPasswordPage = useCallback(() => {
    dispatch(getPasswordReset({ options }))
    if (message !== '') {
      navigate('/reset-password')
      dispatch({ type: CLEAR_MESSAGE })
    }
  }, [message])

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: form.email,
    }),
  }
  //console.log(emailSent)

  /*let login = useCallback(
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
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <form className={styles.form}>
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
            <Button
              htmlType="button"
              type="primary"
              size="large"
              onClick={() => {
                //login
                //setShow(true)
                //dispatch({ type: CLEAR_ARRAY })
                goToResetPasswordPage()
                //emailSent && { type: CLEAR_MESSAGE }
              }}
            >
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
