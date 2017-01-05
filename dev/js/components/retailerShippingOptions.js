import React from 'react';
import Request from 'superagent';
import _ from 'lodash';
import Griddle from 'griddle-react';
import Modal from 'react-modal';

class RetailerShippingOptions extends React.Component {
  constructor() {
    super();
    this.state = {
      id:'',
      retailerId:'',
      retaildashShippingOptionId:'',
      name:'',
      retailerName:'',
      retaildashShippingOptionName:''
    };
    this.retailerShippingOptionList = this.retailerShippingOptionList.bind(this);
    this.createClick = this.createClick.bind(this);
    this.createClose = this.createClose.bind(this);
    this.createRId = this.createRId.bind(this);
    this.createRSId = this.createRSId.bind(this);
    this.createName = this.createName.bind(this);
    this.createRetailerShipping = this.createRetailerShipping.bind(this);
  }

  createClick() {this.setState({openCreate: true});}
  createClose() {this.setState({openCreate:false});}
  createRId(e) {this.setState({retailerId:e.target.value});}
  createRSId(e) {this.setState({retaildashShippingOptionId:e.target.value});}
  createName(e) {this.setState({name:e.target.value});}

  retailerShippingOptionList() {
    var url = "http://localhost:8000/v1/retailerShippingOptions"
    Request.get(url).then((response) =>{
      console.log(response.body.retailerShippingOptions)
      this.setState({
        retailerShippingList : response.body.retailerShippingOptions
      });
    });
  }

  componentWillMount() {
    this.retailerShippingOptionList()
  }

  createRetailerShipping() {
    var url = "http://localhost:8000/v1/retailerShippingOption"
    Request.post(url).send({
      "retailerId": parseInt(this.state.retailerId),
      "retaildashShippingOptionId": parseInt(this.state.retaildashShippingOptionId),
      "name": this.state.name
    }).then((response) =>{
      console.log(response.text)
      this.setState({openCreate:false});
      window.location.href ='/retailerShippingOptions'
    });
  }

  render() {
    return(
      <div>
        <div className="add-button">
          <button className="btn btn-primary add-button" type="button" onClick={this.createClick}><span className="fa fa-plus">  Add</span></button>
        </div>
        <Griddle results={this.state.retailerShippingList} columns={["name", "retailerName", "retaildashShippingOptionName","id"]}/>
        <Modal
          className="Modal__Bootstrap modal-dialog"
          closeTimeoutMS={150}
          isOpen={this.state.openCreate}
          onRequestClose={this.handleModalCloseRequest}
        >
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.createClose}>
                <span aria-hidden="true">&times;</span>
                <span className="sr-only">Close</span>
              </button>
              <h4 className="modal-title">Retailer Shipping Option</h4>
            </div>
              <div className="modal-body modal-body-content">
                <div className="row">
                  <div className="col-md-6">Retailer Id<span className="required">*</span></div>
                  <div className="col-md-6"><input type="text" value = {this.state.retailerId} onChange={this.createRId}/></div>
                </div>
                <div className="row">
                  <div className="col-md-6">Retaildash Shipping Option Id<span className="required">*</span></div>
                  <div className="col-md-6"><input type="text" value = {this.state.retaildashShippingOptionId} onChange={this.createRSId}/></div>
                </div>
                <div className="row">
                  <div className="col-md-6">Name<span className="required">*</span></div>
                  <div className="col-md-6"><input type="text" value = {this.state.name} onChange={this.createName}/></div>
                </div>
              </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" onClick={this.createClose}>Close</button>
              <button type="button" className="btn btn-default" onClick={this.createRetailerShipping}>Save</button>

            </div>
          </div>
        </Modal>
      </div>);
  }
}

export default RetailerShippingOptions;