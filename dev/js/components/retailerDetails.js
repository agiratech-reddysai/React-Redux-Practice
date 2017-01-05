import React from 'react';
import ReactDOM from 'react-dom';
import Request from 'superagent';
import _ from 'lodash';


class RetailerDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      rProducts:[],
      rShippingOptions:[]
    }
    this.viewDetails = this.viewDetails.bind(this);
  }

  viewDetails(id) {
    var url = "http://localhost:8000/v1/retailer/"+id;
    Request.get(url).then((response) => {
      this.setState({
        rId:response.body.retailer.id,
        rName:response.body.retailer.name,
        rBaseUrl:response.body.retailer.baseUrl,
        rCurrency:response.body.retailer.currency,
        rActive:response.body.retailer.active.toString(),
        rCrawlDays:response.body.retailer.crawlDays,
        rCrawlTime:response.body.retailer.crawlTime,
        rProducts:response.body.retailer.products,
        rShippingOptions:response.body.retailer.shippingOptions
      });
      console.log(this.state.rProducts)
    });
  }

  componentWillMount() {
    this.viewDetails(this.props.params.id)
  }
  render() {
    return (<div>
      <Details id={this.state.rId} name={this.state.rName} baseUrl={this.state.rBaseUrl} currency={this.state.rCurrency} active={this.state.rActive} crawlDays={this.state.rCrawlDays} crawlTime={this.state.rCrawlTime}/>
      <h3 className="modal-title">Retailer Shipping Options</h3>
      <div>
          {
            this.state.rShippingOptions.map(function(detail, i){
              return (<ShippingOptionDetail key={i} detail={detail} index={i}/>);
            })
          }
      </div>
      <h3 className="modal-title">Retailer Product Configuration Details</h3>
       <div>
          {
            this.state.rProducts.map(function(detail, i){
              return (<ProductDetail key={detail.id} detail={detail} index={i}/>);
            })
          }
        </div>
      </div>);
  }
}

export default RetailerDetails;

class Details extends React.Component {
  constructor() {
    super();
    this.state = {

    };
    this.closeDetail = this.closeDetail.bind(this);
  }

  closeDetail() {
    window.history.back();
  }

  render() {
    return(<div>
        <div className="modal-header">
          <button type="button" className="close" onClick={this.closeDetail}>&times;</button>
          <h3 className="modal-title">Retailer Details</h3>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col-md-4">name</div>
            <div className="col-md-8"><a href={`${this.props.baseUrl}`} target="_blank">{this.props.name}</a></div>
          </div>
          <div className="row">
            <div className="col-md-4">Currency</div>
            <div className="col-md-8">{this.props.currency}</div>
          </div>
          <div className="row">
            <div className="col-md-4">Active</div>
            <div className="col-md-8">{this.props.active}</div>
          </div>
        </div>
      </div>);
  }
}

class ProductDetail extends React.Component {
  render() {
    return(<div>
      <br/>
      <div className="panel-group">
        <div className="panel panel-info">
          <div className="panel-heading">RPC {this.props.index+1}</div>
          <div className="panel-body panel-body-content">
            <div className="row row-odd">
              <div className="col-md-4">Url</div>
              <div className="col-md-8">{this.props.detail.url}</div>
            </div>
            <div className="row row-even">
              <div className="col-md-4">Url Type</div>
              <div className="col-md-8">{this.props.detail.urlType}</div>
            </div>
            <div className="row row-even">
              <div className="col-md-4">Active</div>
              <div className="col-md-8">{this.props.detail.active}</div>
            </div>
            <div className="row row-even">
              <div className="col-md-4">Description</div>
              <div className="col-md-8">{this.props.detail.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}

class ShippingOptionDetail extends React.Component {
  render() {
    return(<div>
      <br/>
      <div className="panel-group">
        <div className="panel panel-info">
          <div className="panel-heading">Shipping Option {this.props.index+1}</div>
          <div className="panel-body panel-body-content">
            <div className="row row-odd">
              <div className="col-md-4">Retailer Shipping Option</div>
              <div className="col-md-8">{this.props.detail.description}</div>
            </div>
            <div className="row row-even">
              <div className="col-md-4">Retaildash Shipping Option</div>
              <div className="col-md-8">{this.props.detail.standardizedDescription}</div>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}