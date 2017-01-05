import React from 'react';
import ReactDOM from 'react-dom';
import Request from 'superagent';

class RPCDetails extends React.Component {

  render() {
    return(<div>
        <DetailsRPC id ={this.props.params.id} />
      </div>);
  }
}

export default RPCDetails;

class DetailsRPC extends React.Component {
  constructor() {
    super();
    this.state = {

    };
    this.rpcDetails = this.rpcDetails.bind(this);
    this.closeDetail = this.closeDetail.bind(this);
  }

  closeDetail() {
    window.history.back();
  }
  rpcDetails(id) {
    var url = "http://localhost:8000/v1/retailerProductConfiguration/"+id;
    Request.get(url).then((response) =>{
      this.setState({
        url:response.body.retailerProductConfiguration.url,
        urlType:response.body.retailerProductConfiguration.urlType,
        retailerName:response.body.retailerProductConfiguration.retailerName,
        spiderName:response.body.retailerProductConfiguration.spiderName,
        active:response.body.retailerProductConfiguration.active.toString(),
        maxNumberOfRecords:response.body.retailerProductConfiguration.maxNumberOfRecords,
        keyword:response.body.retailerProductConfiguration.keyword,
        description:response.body.retailerProductConfiguration.description
      })
    });
  }

  componentWillMount() {
    this.rpcDetails(this.props.id)
  }

  render() {
    return(<div>
        <div className="modal-header">
          <button type="button" className="close" onClick={this.closeDetail}>&times;</button>
          <h3 className="modal-title">Retailer Product Configuration Details</h3>
        </div>
        <div className="modal-body modal-body-content">
          <div className="row row-odd">
            <div className="col-md-4">Url</div>
            <div className="col-md-8"><a href={this.state.url} target="_blank">{this.state.url}</a></div>
          </div>
          <div className="row row-even">
            <div className="col-md-4">Url Type</div>
            <div className="col-md-8">{this.state.urlType}</div>
          </div>
          <div className="row row-odd">
            <div className="col-md-4">Retailer Name</div>
            <div className="col-md-8">{this.state.retailerName}</div>
          </div>
          <div className="row row-even">
            <div className="col-md-4">Spider Name</div>
            <div className="col-md-8">{this.state.spiderName}</div>
          </div>
          <div className="row row-odd">
            <div className="col-md-4">Active</div>
            <div className="col-md-8">{this.state.active}</div>
          </div>
          <div className="row row-even">
            <div className="col-md-4">Max No. of Records</div>
            <div className="col-md-8">{this.state.maxNumberOfRecords}</div>
          </div>
          <div className="row row-odd">
            <div className="col-md-4">Keyword</div>
            <div className="col-md-8">{this.state.keyword}</div>
          </div>
          <div className="row row-even">
            <div className="col-md-4">Description</div>
            <div className="col-md-8">{this.state.description}</div>
          </div>
        </div>
      </div>);
  }
}
