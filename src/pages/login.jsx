import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import AppHeader from '../components/appheader/appheader'
import styles from './login.module.css'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { getAuth } from '../services/actions/authorization'
//import { getUserInfo } from '../services/actions/userinfo'
//import { useAuth } from '../services/auth'
//import { Button } from '../components/button'
import { Input } from '../components/input'
import { PasswordInput } from '../components/password-input'
import { getAToken } from '../utils/helperfunctions'

export function LoginPage() {
  // let auth = useAuth()
  const navigate = useNavigate()
  const [form, setValue] = useState({ email: '', password: '' })
  const userLoggedIn = useSelector((state) => state.loginReducer.user)
  const dispatch = useDispatch()

  //const handleKeyDown = () => {}

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: getAToken() },
    body: JSON.stringify({
      email: form.email,
      password: form.password,
    }),
  }
  console.log(options)

  useEffect(() => {
    if (userLoggedIn) {
      console.log(userLoggedIn)
      navigate('/')
      //navigate('', { state: [...state, { path: pathname, url, title: countryTitle }], replace: true });
    }
  }, [userLoggedIn])

  /*const options2 = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', authorization: getAToken() },
    body: JSON.stringify({
      email: form.email,
      password: form.password,
    }),
  }
  console.log(options2)*/
  //const user = JSON.parse(getAToken())
  // console.log(user)

  /* const onClick = () => {
    //  const initialBreadcrumb = [{ path: '/', url: '/', title: 'Home' }];
    navigate('/register')
  }*/

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
      <AppHeader />
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
              //login
              //setShow(true)
              //dispatch({ type: CLEAR_ARRAY })
              dispatch(getAuth({ options }))
              //.then(() => {navigate('/profile')})
              //.catch(() => {})
              //dispatch(getUserInfo({ options2 }))
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
