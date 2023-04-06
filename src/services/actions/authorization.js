import { NORMA_API } from '../../utils/burger-api'
//import { getToken } from './../actions/token'
import { setAToken, setRToken } from '../../utils/helperfunctions'

export const GET_AUTH_REQUEST = 'GET_AUTH_REQUEST'
export const GET_AUTH_SUCCESS = 'GET_AUTH_SUCCESS'
export const GET_AUTH_ERROR = 'GET_AUTH_ERROR'

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

/*export const checkUserAuth = () => {
  return (dispatch) => {
    if (getAToken) {
      dispatch(getAuth(options))
        .catch((exception) => {
          console.log(exception)
          removeAToken()
          removeRToken()
          //dispatch(setUser({}));
        })
        .finally(() => dispatch({ isLoggedIn: true }))
    } else {
      dispatch({ isLoggedIn: true })
    }
  }
}*/

export function getAuth({ options }) {
  //const token = 'e8a1cb88700e62e297c26652cbed2c321b9f222b3684a0a38ea754044c55160111d5842fc87ac483'
  /* const options2 = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token: getRToken(),
    }),
  }
  console.log(options2)*/

  return function (dispatch) {
    dispatch({
      type: GET_AUTH_REQUEST,
    })
    fetch(`${NORMA_API}/auth/login`, options)
      .then(checkResponse)
      .then((result) => {
        console.log(result)
        if (result && result.success) {
          console.log('here!')
          dispatch({
            type: GET_AUTH_SUCCESS,
            user: result.user,
            access_token: setAToken(JSON.stringify(result.accessToken)),
            refresh_token: setRToken(JSON.stringify(result.refreshToken)),
            isLoggedIn: true,
          })
        } else {
          console.log('In error')
          dispatch({
            type: GET_AUTH_ERROR,
          })
          //dispatch(getToken({ options2 }))
        }
      })
      .catch((exception) => {
        console.log('In catch!')
        console.log(exception)
        dispatch({
          type: GET_AUTH_ERROR,
        })
        // dispatch(getToken({ options2 }))
      })
  }
}
