import React from 'react';
import ReactDOM from 'react-dom';
import Fetch from 'react-fetch';
import API from 'fetch-api';
import Request from 'superagent';
import _ from 'lodash'

class Home extends React.Component {
    constructor(){
      super();
      this.state = {};
    }

    componentWillMount(){
      var url = "http://localhost:8000/v1/spiders"
      Request.get(url).then((response) =>{
        console.log(response.body.spiders)
        this.setState({
          spiders: response.body.spiders
        });
      });
  }

  render() {
    var retaiss = _.map(this.state.spiders, (spider) =>{
      return (<ul><li>{retai.id} </li>
              <li>{retai.name}</li>
              <li>{retai.createdAt}</li>
              <li>{retai.updatedAt}</li></ul>);
    });
  }
};

export default Home;
