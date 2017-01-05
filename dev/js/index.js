import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { Router, Route, Link, browserHistory, IndexRoute, hashHistory  } from 'react-router';
import {createStore} from 'redux';
import allReducers from './reducers';
import HeadBar from './home/headbar';
import SideBar from './home/sidebar';
import ShippingAddresses from  './components/shippingAddresses';
import RetailerShippingOptions from './components/retailerShippingOptions';
import Retailers from './components/retailers';
import RetailerDetails from './components/retailerDetails';
import RPCList from './components/retailerProductConfigurations';
import RPCDetails from './components/rpcDetails';
// import withExampleBasename from './withExampleBasename'

const store = createStore(allReducers);

class App extends React.Component {
  render() {
    return (<div className="wrapper">
      <HeadBar/>
      <SideBar/>
      <div className="content">
        {this.props.children}
      </div>
    </div>);
  }
}

ReactDOM.render((
   <Router history={hashHistory}>
      <Route path = "/" component = {App}>
         <IndexRoute component = {ShippingAddresses} />
         <Route path = "retailers" component = {Retailers}/>
         <Route path = "retailer/:id" component = {RetailerDetails}/>
         <Route path = "retailerProductConfigurations" component = {RPCList} />
         <Route path = "retailerProductConfiguration/:id" component = {RPCDetails} />
         <Route path = "produtcts" component = {ShippingAddresses} />
         <Route path = "shippingAddresses" component = {ShippingAddresses} />
         <Route path = "retaildashShippingOptions" component = {ShippingAddresses} />
         <Route path = "retailerShippingOptions" component = {RetailerShippingOptions} />
         <Route path = "crawlFrequencyConfigurations" component = {ShippingAddresses} />
         <Route path = "loginAccounts" component = {ShippingAddresses} />
      </Route>
   </Router>

), document.getElementById('root'));


