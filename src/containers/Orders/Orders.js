import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        //FETCHED ORDERS FROM FIREBASE
        axios.get('/orders.json') //orders document in firebase
            .then(res => {
                //turn our orders object into array
                const fetchedOrders=[];
                for( let key in res.data ){
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({loading:false, orders: fetchedOrders});
            })
            .catch(err => {
                this.setState({loading:false});
            });
    }

    render(){
        return(
            <div>
                {this.state.orders.map(order => (
                    <Order //passing information to the order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}/>
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);