import React, {useState, useEffect, useRef, useCallback} from 'react';
import InitialData from '../../utils/data';
import BurgerIngStyles from './burgering.module.css';
import BurgerConstructor from './../burgerconstructor/burgerconstructor';
import { Tab, CurrencyIcon, Counter, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';


function BurgerIngredients() {
    const [current, setCurrent] = React.useState('one');
    const [count, setCount] = React.useState(0);
    const initial_array = InitialData();
    const ref = useRef(null);
    
    const handleAddIngredient = React.useCallback(
        (obj) => () => {
        setCount(count + 1);
        return count;
    }, []);

    /*const handleTabClick = () => {
        ref.current?.scrollIntoView({behavior: 'smooth'});
        return setCurrent;
    }*/

    const FilterItems = (props) => {
            
        const filtered_array = initial_array.filter(ingr => ingr.type === props.type).map(filteredIngr => (
            <React.Fragment key={filteredIngr._id}>
            <div className={BurgerIngStyles.column1} onClick={handleAddIngredient(filteredIngr)}>  
            <Counter count={1} size="default" extraClass="m-1"/> 
            
            <img src={filteredIngr.image}></img>
            <div className={BurgerIngStyles.pricebox}>
                <span className="text text_type_digits-default">{filteredIngr.price}</span>    
                <CurrencyIcon />
            </div>
            <p className="text text_type_main-default" style={{textAlign: 'center'}}>{filteredIngr.name}</p>
            </div>
            </React.Fragment>
            
          ))
          return filtered_array;
    }

    return(
        <>
        <div className={BurgerIngStyles.mainbox}>
            <header className="text text_type_main-large" style={{paddingTop: '40px', paddingBottom: '20px'}}>Соберите бургер</header>
            <div className={BurgerIngStyles.tabs}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                Начинки
                </Tab>
            </div>
            <div className={BurgerIngStyles.ing_block}>
                <p className="text text_type_main-medium" style={{paddingTop: '40px', paddingBottom: '24px'}}>Булки</p>
                <div className={BurgerIngStyles.grid_block}>               
                    <FilterItems type="bun"/>   
                </div>
                <p className="text text_type_main-medium" style={{paddingTop: '40px', paddingBottom: '24px'}}>Соусы</p>
                <div className={BurgerIngStyles.grid_block}>                                      
                    <FilterItems type="sauce"/> 
                </div>
                <p className="text text_type_main-medium" style={{paddingTop: '40px', paddingBottom: '24px'}}>Начинки</p>
                <div className={BurgerIngStyles.grid_block}>
                    <FilterItems type="main"/> 
                </div>
            </div>
        </div>
        </>
    );
    
}

export default BurgerIngredients;