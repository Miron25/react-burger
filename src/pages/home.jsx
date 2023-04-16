import AppHeader from '../components/appheader/appheader'
import '../App.css'
import BurgerIngredients from '../components/burgeringredients/burgeringredients'
import BurgerConstructor from '../components/burgerconstructor/burgerconstructor'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

export function HomePage() {
  return (
    <div id="root">
      <AppHeader />
      <>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </>
    </div>
  )
}
