import { Link } from 'react-router-dom'
import styles from './not-found.module.css'

export function NotFound404() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h1 className="text text_type_main-large">Упс! Ошибка 404</h1>
            <p className="text text_type_main-medium">Страница не существует</p>
            <br />
            <br />
            <p className="text text_type_main-small">
              Проверьте адрес или вернитесь на{' '}
              <Link to="/" className={styles.link}>
                домашнюю страницу
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
