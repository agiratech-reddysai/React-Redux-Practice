import React from 'react';
import Request from 'superagent';
import _ from 'lodash';
import Griddle from 'griddle-react';
// import {AgGridReact} from 'ag-grid-react-component';
import Modal from 'react-modal';



class ShippingAddresses extends React.Component {
    constructor(){
      super();
      this.state = {
        address1:'',
        address2:'',
        city:'',
        state:'',
        country:'',
        zipCode:'',
        retailerId:''
      };
      this.createAddress = this.createAddress.bind(this);
      this.createClick = this.createClick.bind(this);
      this.closeCreate = this.closeCreate.bind(this);
      this.createRId = this.createRId.bind(this);
      this.createAd1 = this.createAd1.bind(this);
      this.createAd2 = this.createAd2.bind(this);
      this.createCity = this.createCity.bind(this);
      this.createState = this.createState.bind(this);
      this.createCountry = this.createCountry.bind(this);
      this.createZipcode = this.createZipcode.bind(this);
      this.addressList = this.addressList.bind(this);
    }

    addressList() {
      var url = "http://localhost:8000/v1/shippingAddresses"
      Request.get(url).set('Api-Key','scrapinghupapi').then((response) =>{
        console.log(response.body.shippingAddresses)
        this.setState({
          addresses: response.body.shippingAddresses
        });
      });
    }
    componentWillMount(){
      this.addressList()
    }

    // componentWillUnmount() {
    //   this.addressList()
    // }
    createClick() {
      this.setState({openCreate: true});
    }

    closeCreate() {this.setState({openCreate:false});}
    createRId(e) {this.setState({retailerId:e.target.value});}
    createAd1(e) {this.setState({address1:e.target.value});}
    createAd2(e) {this.setState({address2:e.target.value});}
    createCity(e) {this.setState({city:e.target.value});}
    createState(e) {this.setState({state:e.target.value});}
    createCountry(e) {this.setState({country:e.target.value});}
    createZipcode(e) {this.setState({zipCode:e.target.value});}

    createAddress() {
      var url = "http://localhost:8000/v1/shippingAddress"
      Request.post(url).send({
      "address1": this.state.address1,
      "address2": this.state.address2,
      "city": this.state.city,
      "state": this.state.state,
      "country": this.state.country,
      "zipCode": this.state.zipCode,
      "retailerId": parseInt(this.state.retailerId)
      }).then((response) =>{
          console.log(response.text)
          this.setState({openCreate:false});
          window.location.href ='/shippingAddresses'
        });
    }

  render() {

    return (<div>
      <div className="add-button">
        <button className="btn btn-primary add-button" type="button" onClick={this.createClick}><span className="fa fa-plus">  Add</span></button>
      </div>
      <Griddle results={this.state.addresses} columns={["address1", "address2", "city", "state", "country", "zipCode", "retailerId","id"]}
      columnMetadata={[{columnName:"id",displayName:"Events",customComponent:Custom},
      {columnName:"id",displayName:"Id"}]}/>
      <Modal
          className="Modal__Bootstrap modal-dialog"
          closeTimeoutMS={150}
          isOpen={this.state.openCreate}
          onRequestClose={this.handleModalCloseRequest}
        >
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.closeCreate}>
                <span aria-hidden="true">&times;</span>
                <span className="sr-only">Close</span>
              </button>
              <h4 className="modal-title">Shipping address details</h4>
            </div>
              <div className="modal-body modal-body-content">
                <div className="row">
                  <div className="col-md-6">Retailer Id<span className="required">*</span></div>
                  <div className="col-md-6"><input type="text" value = {this.state.retailerId} onChange={this.createRId}/></div>
                </div>
                <div className="row">
                  <div className="col-md-6">Address1<span className="required">*</span></div>
                  <div className="col-md-6"><input type="text" value = {this.state.address1} onChange={this.createAd1}/></div>
                </div>
                <div className="row">
                  <div className="col-md-6">Address2<span className="required">*</span></div>
                  <div className="col-md-6"><input type="text" value = {this.state.address2} onChange={this.createAd2}/></div>
                </div>
                <div className="row">
                  <div className="col-md-6">City<span className="required">*</span></div>
                  <div className="col-md-6"><input type="text" value = {this.state.city} onChange={this.createCity}/></div>
                </div>
                <div className="row">
                  <div className="col-md-6">State<span className="required">*</span></div>
                  <div className="col-md-6"><input type="text" value = {this.state.state} onChange={this.createState}/></div>
                </div>
                <div className="row">
                  <div className="col-md-6">Country<span className="required">*</span></div>
                  <div className="col-md-6"><input type="text" value = {this.state.country} onChange={this.createCountry}/></div>
                </div>
                <div className="row">
                  <div className="col-md-6">ZipCode<span className="required">*</span></div>
                  <div className="col-md-6"><input type="text" value = {this.state.zipCode} onChange={this.createZipcode}/></div>
                </div>
              </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" onClick={this.closeCreate}>Close</button>
              <button type="button" className="btn btn-default" onClick={this.createAddress}>Save</button>

            </div>
          </div>
        </Modal>
      </div>
      );
    }
};

class Custom extends React.Component {
  constructor(){
      super();
      this.state = {
        id:'',
        address1:'',
        address2:'',
        city:'',
        state:'',
        country:'',
        zipCode:'',
        retailerId:''

      };
      this.detailClick = this.detailClick.bind(this);
      this.editClick = this.editClick.bind(this);
      this.deleteClick = this.deleteClick.bind(this);
      this.closeDetail = this.closeDetail.bind(this);
      this.closeEdit = this.closeEdit.bind(this);
      this.closeDelete = this.closeDelete.bind(this);
      this.updateAddress = this.updateAddress.bind(this);
      this.deleteAddress = this.deleteAddress.bind(this);
      this.updateAd1 = this.updateAd1.bind(this);
      this.updateAd2 = this.updateAd2.bind(this);
      this.updateCity = this.updateCity.bind(this);
      this.updateState = this.updateState.bind(this);
      this.updateCountry = this.updateCountry.bind(this);
      this.updateZipcode = this.updateZipcode.bind(this);
      this.updateRId = this.updateRId.bind(this);
    }

  closeDetail () { this.setState({openDetail: false}); }
  closeEdit () { this.setState({openEdit: false}); }
  closeDelete () { this.setState({openDelete: false}); }

  detailClick(id) {
    console.log("detailclicked"+id)
    var url = "http://localhost:8000/v1/shippingAddress/"+id;
    Request.get(url).then((response) =>{
      this.setState({
        shippingDetail: response.body.shippingAddress,
        id:response.body.shippingAddress.id,
        address1:response.body.shippingAddress.address1,
        address2:response.body.shippingAddress.address2,
        city:response.body.shippingAddress.city,
        state:response.body.shippingAddress.state,
        country:response.body.shippingAddress.country,
        zipCode:response.body.shippingAddress.zipCode,
        retailerId:response.body.shippingAddress.retailerId,
        openDetail: true
      });
      console.log("aaaaa"+this.state.shippingDetail)
    });
  }

  editClick(id) {
    console.log("editclicked"+id)
    var url = "http://localhost:8000/v1/shippingAddress/"+id;
    Request.get(url).then((response) =>{
      this.setState({
        id:response.body.shippingAddress.id,
        address1:response.body.shippingAddress.address1,
        address2:response.body.shippingAddress.address2,
        city:response.body.shippingAddress.city,
        state:response.body.shippingAddress.state,
        country:response.body.shippingAddress.country,
        zipCode:response.body.shippingAddress.zipCode,
        retailerId:response.body.shippingAddress.retailerId,
        openEdit: true
      });
    });
  }
  updateAd1(e) {this.setState({address1:e.target.value});}
  updateAd2(e) {this.setState({address2:e.target.value});}
  updateCity(e) {this.setState({city:e.target.value});}
  updateState(e) {this.setState({state:e.target.value});}
  updateCountry(e) {this.setState({country:e.target.value});}
  updateZipcode(e) {this.setState({zipCode:e.target.value});}
  updateRId(e) {this.setState({retailerId:e.target.value});}

  updateAddress() {
    console.log("hello"+ this.state.zipCode)
    var url = "http://localhost:8000/v1/shippingAddress/"+this.state.id;
    Request.put(url).send({
      "address1": this.state.address1,
      "address2": this.state.address2,
      "city": this.state.city,
      "state": this.state.state,
      "country": this.state.country,
      "zipCode": this.state.zipCode,
      "retailerId": parseInt(this.state.retailerId)
    }).then((response) =>{
      console.log(response.text)
      this.setState({
        openEdit: false
      });
      window.location.href ='/'
    });
  }

  deleteClick(aid) {
    console.log("deleteclicked"+aid)
    this.setState({id:aid,openDelete: true});
  }
  deleteAddress() {
    var url = "http://localhost:8000/v1/shippingAddress/"+this.state.id;
    console.log(this.state.id)
    Request.delete(url).then((response) =>{
      this.setState({
        openDelete: false
      });
      window.location.href ='/'
    });
  }

  render() {
    return ( <div>
      <i className="fa fa-eye view-icon" onClick={this.detailClick.bind(null,this.props.rowData.id)} ></i>&nbsp;
      <i className="fa fa-edit view-icon" onClick={this.editClick.bind(null,this.props.rowData.id)} ></i>&nbsp;
      <i className="fa fa-times view-icon" onClick={this.deleteClick.bind(null,this.props.rowData.id)} ></i>
      <Modal
          className="Modal__Bootstrap modal-dialog"
          closeTimeoutMS={150}
          isOpen={this.state.openDetail}
          onRequestClose={this.handleModalCloseRequest}
        >
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.closeDetail}>
                <span aria-hidden="true">&times;</span>
                <span className="sr-only">Close</span>
              </button>
              <h4 className="modal-title">Shipping address details</h4>
            </div>
              <div className="modal-body modal-body-content">
                <div className="row">
                  <div className="col-md-6">Address1</div>
                  <div className="col-md-6">{this.state.address1}</div>
                </div>
                <div className="row">
                  <div className="col-md-6">Address2</div>
                  <div className="col-md-6">{this.state.address2}</div>
                </div>
                <div className="row">
                  <div className="col-md-6">City</div>
                  <div className="col-md-6">{this.state.city}</div>
                </div>
                <div className="row">
                  <div className="col-md-6">State</div>
                  <div className="col-md-6">{this.state.state}</div>
                </div>
                <div className="row">
                  <div className="col-md-6">Country</div>
                  <div className="col-md-6">{this.state.country}</div>
                </div>
                <div className="row">
                  <div className="col-md-6">ZipCode</div>
                  <div className="col-md-6">{this.state.zipCode}</div>
                </div>
              </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" onClick={this.closeDetail}>Close</button>

            </div>
          </div>
        </Modal>
        <Modal
          className="Modal__Bootstrap modal-dialog"
          closeTimeoutMS={150}
          isOpen={this.state.openEdit}
          onRequestClose={this.handleModalCloseRequest}
        >
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.closeEdit}>
                <span aria-hidden="true">&times;</span>
                <span className="sr-only">Close</span>
              </button>
              <h4 className="modal-title">Shipping address details</h4>
            </div>
              <div className="modal-body modal-body-content">
                <div className="row">
                  <div className="col-md-6">Retailer Id<span className="required">*</span></div>
                  <div className="col-md-6"><input type="text" value = {this.state.retailerId} onChange={this.updateRId}/></div>
                </div>
                <div className="row">
                  <div className="col-md-6">Address1<span className="required">*</span></div>
                  <div className="col-md-6"><input type="text" value = {this.state.address1} onChange={this.updateAd1}/></div>
                </div>
                <div className="row">
                  <div className="col-md-6">Address2<span className="required">*</span></div>
                  <div className="col-md-6"><input type="text" value = {this.state.address2} onChange={this.updateAd2}/></div>
                </div>
                <div className="row">
                  <div className="col-md-6">City<span className="required">*</span></div>
                  <div className="col-md-6"><input type="text" value = {this.state.city} onChange={this.updateCity}/></div>
                </div>
                <div className="row">
                  <div className="col-md-6">State<span className="required">*</span></div>
                  <div className="col-md-6"><input type="text" value = {this.state.state} onChange={this.updateState}/></div>
                </div>
                <div className="row">
                  <div className="col-md-6">Country<span className="required">*</span></div>
                  <div className="col-md-6"><input type="text" value = {this.state.country} onChange={this.updateCountry}/></div>
                </div>
                <div className="row">
                  <div className="col-md-6">ZipCode<span className="required">*</span></div>
                  <div className="col-md-6"><input type="text" value = {this.state.zipCode} onChange={this.updateZipcode}/></div>
                </div>
              </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" onClick={this.closeEdit}>Close</button>
              <button type="button" className="btn btn-default" onClick={this.updateAddress}>Update</button>

            </div>
          </div>
        </Modal>
        <Modal
          className="Modal__Bootstrap modal-dialog"
          closeTimeoutMS={150}
          isOpen={this.state.openDelete}
          onRequestClose={this.handleModalCloseRequest}
        >
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.closeDelete}>
                <span aria-hidden="true">&times;</span>
                <span className="sr-only">Close</span>
              </button>
              <h4 className="modal-title">Shipping address details</h4>
            </div>
            <div className="modal-body modal-body-content">
              <h2> Are sure to delete </h2>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" onClick={this.closeDelete}>Close</button>
              <button type="button" className="btn btn-default" onClick={this.deleteAddress}>Delete</button>

            </div>
          </div>
        </Modal></div>);
  }
};

export default ShippingAddresses;