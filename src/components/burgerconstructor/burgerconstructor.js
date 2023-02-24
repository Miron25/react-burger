import React, {useState} from 'react';
import BurgerConsStyles from './burgercons.module.css';
import BurgerIngredients from './../burgeringredients/burgeringredients';
import InitialData from '../../utils/data';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor() {
    const init_array = InitialData();
  
    
    return (
        <div className={BurgerConsStyles.main}>
          
            <div className={BurgerConsStyles.constr_block}>
              {
              <>
              <span style={{marginLeft: "auto"}}>
              <ConstructorElement
              type="top"
              isLocked={true}
              text={init_array[0].name + " (верх)"}
              price={init_array[0].price/2}
              thumbnail={init_array[0].image} 
              />           
              </span>
              <span>
              <DragIcon/>
              <ConstructorElement
              text={init_array[5].name}
              price={init_array[5].price}
              thumbnail={init_array[5].image}
              />
              </span>
              <span>
              <DragIcon/>
              <ConstructorElement
              text={init_array[4].name}
              price={init_array[4].price}
              thumbnail={init_array[4].image}
              />
              </span>
              <span>
              <DragIcon/>
              <ConstructorElement
              text={init_array[7].name}
              price={init_array[7].price}
              thumbnail={init_array[7].image}
              />
              </span>
              <span>
              <DragIcon/>
              <ConstructorElement
              text={init_array[8].name}
              price={init_array[8].price}
              thumbnail={init_array[8].image}
              />
              </span>
              <span>
              <DragIcon/>
              <ConstructorElement
              text={init_array[8].name}
              price={init_array[8].price}
              thumbnail={init_array[8].image}
              />
              </span>
              <span>
              <DragIcon/>
              <ConstructorElement
              text={init_array[10].name}
              price={init_array[10].price}
              thumbnail={init_array[10].image}
              />
              </span>
              <span>
              <DragIcon/>
              <ConstructorElement
              text={init_array[11].name}
              price={init_array[11].price}
              thumbnail={init_array[11].image}
              />
              </span>
              <span style={{marginLeft: "auto"}}>
              <ConstructorElement
              type="bottom"
              isLocked={true}
              text={init_array[0].name + " (низ)"}
              price={init_array[0].price/2}
              thumbnail={init_array[0].image}
              />
              </span>
              </>
              }
              
            
          </div>
          <div className={BurgerConsStyles.info_block}>
            {
              <>
              <span className={BurgerConsStyles.total_price + "text text_type_digits-medium"}>4081
                <CurrencyIcon />
              </span>
              <Button htmlType="button" type="primary" size="large">
              Оформить заказ
            </Button>
            </>
            }
          </div>
        </div>
    );
  

}

export default BurgerConstructor;