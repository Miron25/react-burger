import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import { Navigate } from 'react-router-dom'
import AppHeader from '../components/appheader/appheader'
import styles from './profile.module.css'
import { EditIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { getAToken } from '../utils/helperfunctions'
import { getUserInfo } from '../services/actions/userinfo'

//import { useAuth } from '../services/auth'
//import { Button } from '../components/button'
//import { Input } from '../components/input'
//import { PasswordInput } from '../components/password-input'

export function ProfilePage() {
  const userLoggedIn = useSelector((state) => state.userInfoReducer.user)
  const dispatch = useDispatch()
  /*setAToken(
    JSON.stringify(
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM3OGUxMDkwNWZkMDAxYjYyNzY5MyIsImlhdCI6MTY4MDY4MzMxNCwiZXhwIjoxNjgwNjg0NTE0fQ._4azV5mHZiULmyPwPkhsc9VHxG0ByLcl3z7biqMrjCY'
    )
  )*/

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: JSON.parse(getAToken()),
    },
  }
  console.log(options)

  useEffect(() => {
    //if (userLoggedIn) {
    //console.log(userLoggedIn)
    dispatch(getUserInfo({ options }))
    //navigate('', { state: [...state, { path: pathname, url, title: countryTitle }], replace: true });
    //}
  }, [dispatch])

  // let auth = useAuth()

  //const [form, setValue] = useState({ email: '', password: '' })

  /*const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  let login = useCallback(
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
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.frame}>
            <span className="text text_type_main-medium">Профиль</span>
          </div>
          <div className={styles.frame}>
            <span className="text text_type_main-medium text_color_inactive">
              История заказов
            </span>
          </div>
          <div className={styles.frame}>
            <span className="text text_type_main-medium text_color_inactive">
              Выход
            </span>
          </div>
        </div>
        <div className={styles.caption}>
          <span className="text text_type_main-default text_color_inactive">
            В этом разделе вы можете изменить свои персональные данные
          </span>
        </div>
        <div className={styles.form}>
          <div className={styles.info_block}>
            <div>
              <p className="text text_type_main-default text_color_inactive">
                Имя
              </p>
              <p className="text text_type_main-default text_color_inactive">
                {userLoggedIn && userLoggedIn.name}
              </p>
            </div>
            <span className={styles.icon}>
              <EditIcon />
            </span>
          </div>
          <div className={styles.info_block}>
            <div>
              <p className="text text_type_main-default text_color_inactive">
                Логин
              </p>
              <p className="text text_type_main-default text_color_inactive">
                {userLoggedIn && userLoggedIn.email}
              </p>
            </div>
            <span className={styles.icon}>
              <EditIcon />
            </span>
          </div>
          <div className={styles.info_block}>
            <div>
              <p className="text text_type_main-default text_color_inactive">
                Пароль
              </p>
              <p className="text text_type_main-default text_color_inactive">
                ******
              </p>
            </div>
            <span className={styles.icon}>
              <EditIcon />
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
