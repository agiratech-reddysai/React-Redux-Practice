var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var RetaildashDispatcher =assign(new Dispatcher(), {
  handleViewAction(action){
    payload = {
      source:'VIEW_ACTION',
      action: action
    }
    this.dispatch(payload);
  }
});

module.exports = RetaildashDispatcher;