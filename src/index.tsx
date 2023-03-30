import * as ReactDOM from 'react-dom/client'
import App from './App'
//import reportWebVitals from './reportWebVitals'
//import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from './services/reducers'
import thunk from 'redux-thunk'

/*const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
})*/

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals()
