import React from 'react';
//import logo from './logo.svg';
import './App.css';
import AppHeader from './components/appheader/appheader';
import BurgerIngredients from './components/burgeringredients/burgeringredients';
import BurgerConstructor from './components/burgerconstructor/burgerconstructor';

function App() {
  return (
    <div id="root">
    <AppHeader />
    <BurgerIngredients />
    <BurgerConstructor />
    </div>
  );
}

export default App;
