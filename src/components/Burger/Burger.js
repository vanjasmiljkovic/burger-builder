import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    //If we use hire ordered component we can inject those special props to any component - withRouter
    console.log(props); //we don't have props match and history because it is not directly loaded thrue Route
    // transform an object of key value pairs into an array of burgetIngrediens, value - how many ingredients, key- which type of ingredient
    let transformedIngredients = Object.keys(props.ingredients) //keys returns us an array
        .map(igKey => {
            return [...Array( props.ingredients[igKey] )].map( ( _, i ) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />;  //igKey - salad + i (+1/2/3)
            }); 
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);     //initial value [] is empty array of reduced value 
    if (transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients!</p>
    }            //map - execute a function on each element of array
                    //transform array into sth else
        console.log(transformedIngredients);

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default withRouter(burger);