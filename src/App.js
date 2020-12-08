import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '../src/hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

class App extends Component {
  /*
  state = {
    show: true
  };

  componentDidMount(){
    setTimeout(() => {  //after 5 sec to execute this function
      this.setState({show: false});
    } , 5000);
  }
  */

  render() {
    // without exact order would matter
    //path with exact - order is not important
    // with Switch - only one to hit - order is important (first checkout)
    return (
      <div>
        <Layout>
          <Switch>
            < Route path="/checkout" component={Checkout} />
            < Route path="/orders" component={Orders} />
            < Route path="/" component={BurgerBuilder} />
            {/*{this.state.show ? <BurgerBuilder /> : null} */}
          </Switch>
        </Layout>

      </div>
    );
  }
}

export default App;
