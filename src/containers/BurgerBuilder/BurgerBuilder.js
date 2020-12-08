import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        //totalPrice: 4, //base price for burger
        //purchaseable: false, //true when we can buy burger- at least one ingredient
        //those 3 down local UI states 
        purchasing: false,
        loading: false,
        error: false
    }

    //fetching data - componentDidMount
    componentDidMount(){ 
        //everything that is loaded thrue Route gets this special props - history, match ..
        console.log(this.props); // we have history and match props
        // axios.get('https://react-burger-eca15.firebaseio.com/ingredients.json')
        // .then(response => {
        //     this.setState({ingredients: response.data});
        // })
        // .catch(error =>{
        //     this.setState({error: true})
        // });
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients) //makes an array of ingredients
            .map(igKey => {
                return ingredients[igKey]; //getting values, numbers of property meat,cheese ...
            })
            .reduce((sum, el) => {
                return sum + el; //el - number (0,1,2...)
            }, 0);
        return sum > 0;
    
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <= 0){
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    //SLANJE PORUDZBINE NA SERVER (firebase)
     purchaseContinueHandler = () => {  
        this.props.history.push('/checkout');
     }
    //     const queryParams = [];
    //     for (let i in this.state.ingredients){
    //         //property name = value of that property name (bacon = 1)
    //         queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    //     }
    //     //now totalPrice will be passed as query parameter and now we will get it in Checkout component
    //     queryParams.push('price=' + this.state.totalPrice);
    //     const queryString = queryParams.join('&');

    //     this.props.history.push({  //to push a new page
    //         pathname: '/checkout',
    //         search: '?' + queryString // http://localhost:3000/checkout?bacon=1&cheese=0&meat=1&salad=1
    //     }); 
    // }

    render(){
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0   //disabledInfo[key] value of salad, meat ... 0,1,2
        }
        let orderSummary = null;
    
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if(this.props.ings){
            burger = (
                <Aux>
                     <Burger ingredients={this.props.ings}/>
                     <BuildControls 
                         ingredientAdded = {this.props.onIngredientAdded}
                         ingredientRemove = {this.props.onIngredientRemoved}
                         disabled = {disabledInfo} 
                         purchaseable = {this.updatePurchaseState(this.props.ings)}
                         ordered = {this.purchaseHandler}
                         price = {this.props.price}/>
                 </Aux> 
             );
                orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />
       
        }
        if(this.state.loading){
            orderSummary = <Spinner />;
        }
        // disabledInfo -> {salad: true, meat:false, ..}
        return(
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));