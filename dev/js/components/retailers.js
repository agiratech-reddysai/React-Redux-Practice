import React from 'react';
import ReactDOM from 'react-dom';
import Request from 'superagent';
import _ from 'lodash';
import Griddle from 'griddle-react';
// import Modal from 'react-modal';
import {Link} from 'react-router';

class Retailers extends React.Component {
  constructor() {
    super();
    this.state = {

    };
    this.retailersList = this.retailersList.bind(this);
  }

  retailersList() {
    var url = "http://localhost:8000/v1/retailers"
    Request.get(url).then((response) =>{
      console.log(response.body.retailers[0].active)
      this.setState({retailers:response.body.retailers});
    });
  }

  componentWillMount() {
    this.retailersList()
  }

  render() {
    return(<div>
      <Griddle results={this.state.retailers} columns={["name","currency","active","id"]} columnMetadata={[{columnName:"active",displayName:"Active",customComponent:ConvBool},
      {columnName:"id",displayName:"Events",customComponent:Event}]}/>
      </div>);
  }
}

export default Retailers;

class ConvBool extends React.Component {
  render() {
    return(<span>{this.props.rowData.active.toString()}</span>);
  }
}

class Event extends React.Component {
  render() {
    return(<div>
      <Link to ={`/retailer/${this.props.rowData.id}`}><i className="fa fa-eye view-icon"></i></Link>
      </div>);
  }
}

//  onClick={this.viewDetails.bind(null,this.props.rowData.id)}