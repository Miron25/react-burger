import IngDetailsStyles from './ingredientdetails.module.css'
import { useSelector } from '../../services/types/hooks'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { ReactNode, ReactElement, FC } from 'react'

type TModal = { directLink: boolean }

type TCIng = TModal & { children: ReactNode }

function CenterIngredient({ children, directLink }: TCIng): ReactElement {
  return directLink ? (
    <div className={IngDetailsStyles.frame}>{children}</div>
  ) : (
    <>{children}</>
  )
}

export const ModalContent: FC<TModal> = ({ directLink }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { ingredientId } = useParams<{ ingredientId: string }>()

  const ingredientsList = useSelector((state) => state.feed.feed)
  const ingDetails = ingredientsList.find((item) => item._id === ingredientId)

  return (
    <>
      <CenterIngredient directLink={directLink}>
        <div
          className={IngDetailsStyles.popup_title}
          data-test={'details-title'}
        >
          <h1
            className={`${
              IngDetailsStyles.popup_header
            } ${'text text_type_main-large'}`}
          >
            Детали ингредиента
          </h1>
          {!directLink && (
            <div data-test={'close-btn'}>
              <CloseIcon
                type="primary"
                onClick={() => {
                  location.state.background && navigate(-1)
                }}
              />
            </div>
          )}
        </div>

        <img
          src={ingDetails?.image}
          alt=""
          className={IngDetailsStyles.popup_img}
        ></img>
        <div className={IngDetailsStyles.popup_name}>
          <h2 className="text text_type_main-medium">{ingDetails?.name}</h2>
        </div>
        <ul className={IngDetailsStyles.popup_nutrition}>
          <div className={IngDetailsStyles.popup_nutrition_value}>
            <span className="text text_type_main-default text_color_inactive">
              Калории,ккал
            </span>
            <span className="text text_type_digits-default">
              {ingDetails?.calories}
            </span>
          </div>
          <div className={IngDetailsStyles.popup_nutrition_value}>
            <span className="text text_type_main-default text_color_inactive">
              Белки, г
            </span>
            <span className="text text_type_digits-default">
              {ingDetails?.proteins}
            </span>
          </div>
          <div className={IngDetailsStyles.popup_nutrition_value}>
            <span className="text text_type_main-default text_color_inactive">
              Жиры, г
            </span>
            <span className="text text_type_digits-default">
              {ingDetails?.fat}
            </span>
          </div>
          <div className={IngDetailsStyles.popup_nutrition_value}>
            <span className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </span>
            <span className="text text_type_digits-default">
              {ingDetails?.carbohydrates}
            </span>
          </div>
        </ul>
      </CenterIngredient>
    </>
  )
}
