import React from 'react';
import ReactDOM from 'react-dom';
import Request from 'superagent';
import Griddle from 'griddle-react';
import Modal from 'react-modal';
import {Link} from 'react-router';

class RPCList extends React.Component {
  constructor() {
    super();
    this.state ={

    };
    this.rpcList = this.rpcList.bind(this);
  }

  rpcList() {
    var url ="http://localhost:8000/v1/retailerProductConfigurations"
    Request.get(url).then((response) =>{
      this.setState({rpcs:response.body.retailerProductConfigurations});
    });
  }

  componentWillMount() {
    this.rpcList()
  }

  render() {
    return(<div>
      <Griddle results={this.state.rpcs} columns={["urlType","retailerName","active","id"]} columnMetadata={[{columnName:"active",displayName:"Active",customComponent:ConvBool},
      {columnName:"id",displayName:"Events",customComponent:Event}]}/>
      </div>);
  }
}

export default RPCList;

class ConvBool extends React.Component {
  render() {
    return(<span>{this.props.rowData.active.toString()}</span>);
  }
}

class Event extends React.Component {
  constructor() {
    super();
    this.state ={
      id:'',
      maxNumberOfRecords:'',
      active:''
    };
    this.editClick = this.editClick.bind(this);
    this.editClose = this.editClose.bind(this);
    this.updateRPC = this.updateRPC.bind(this);
    this.updatemaxNumOfRecord = this.updatemaxNumOfRecord.bind(this);
    this.updateAcive = this.updateAcive.bind(this);
    this.strtoBool = this.strtoBool.bind(this);
  }

  editClick(id) {
    var url = "http://localhost:8000/v1/retailerProductConfiguration/"+id;
    Request.get(url).then((response) =>{
      this.setState({
        id:response.body.retailerProductConfiguration.id,
        active:response.body.retailerProductConfiguration.active.toString(),
        maxNumberOfRecords:response.body.retailerProductConfiguration.maxNumberOfRecords,
        openEdit:true
      });
    });
  }

  editClose() {this.setState({openEdit:false});}
  updatemaxNumOfRecord(e) {this.setState({maxNumberOfRecords:e.target.value})}
  updateAcive(e) {this.setState({active:e.target.value})}
  strtoBool(value) {
     if (value && typeof value === 'string') {
     if (value.toLowerCase() === "true") return true;
     if (value.toLowerCase() === "false") return false;
   }
   return value;
  }
  updateRPC() {
    var url = "http://localhost:8000/v1/retailerProductConfiguration/"+this.state.id;
    Request.put(url).send({
      "maxNumberOfRecords": parseInt(this.state.maxNumberOfRecords),
      "active": this.strtoBool(this.state.active)
    }).then((response) =>{
      console.log(response.text)
      this.setState({openEdit:false})
      // window.location.href ='/retailerProductConfigurations'
    })
  }

  render() {
    return(<div>
      <Link to ={`/retailerProductConfiguration/${this.props.rowData.id}`}><i className="fa fa-eye view-icon"></i></Link>
      &nbsp;
      <i className="fa fa-edit view-icon" onClick={this.editClick.bind(null,this.props.rowData.id)} ></i>
      <Modal
          className="Modal__Bootstrap modal-dialog"
          closeTimeoutMS={150}
          isOpen={this.state.openEdit}
          onRequestClose={this.handleModalCloseRequest}
        >
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.editClose}>
                <span aria-hidden="true">&times;</span>
                <span className="sr-only">Close</span>
              </button>
              <h4 className="modal-title">Update Retailer product configuration details</h4>
            </div>
              <div className="modal-body modal-body-content">
                <div className="row">
                  <div className="col-md-6">Active<span className="required">*</span></div>
                  <div className="col-md-6">
                  <input type="radio" value = "true" checked={this.state.active === "true"} onChange={this.updateAcive}/>  True &nbsp;
                  <input type="radio" value = "false" checked={this.state.active === "false"} onChange={this.updateAcive} /> False
                </div>
                </div>
                <div className="row">
                  <div className="col-md-6">Max Number of records</div>
                  <div className="col-md-6"><input type="text" value = {this.state.maxNumberOfRecords} onChange={this.updatemaxNumOfRecord}/></div>
                </div>
              </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" onClick={this.editClose}>Close</button>
              <button type="button" className="btn btn-default" onClick={this.updateRPC}>Update</button>

            </div>
          </div>
        </Modal>
    </div>);
  }
}