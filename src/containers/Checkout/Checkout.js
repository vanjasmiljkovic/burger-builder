import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
    // state = {
    //     ingredients : null,
    //     price: 0
    // }

    // componentWillMount(){
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()){ // to loop thrue diff query params
    //         // ['salad', '1']
    //         if(param[0] === 'price'){ // if the param is price I don't want to add it to ingredients object
    //             price = param[1]; //extract price value and store it in the price variable
    //         }else{
    //             ingredients[param[0]] = +param[1] // + convert to number
    //         }
    //     }
    //     this.setState({ingredients: ingredients, totalPrice: price});
    // }      

    checkoutCancelledHandler = () => {
        this.props.history.goBack(); //it goes back to the last page
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route 
                    path={this.props.match.path + '/contact-data/'} 
                    component = {ContactData} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    };
}

//connect(null, mapDispatchToProps) if we don't have mapStateToProps
export default connect(mapStateToProps)(Checkout);