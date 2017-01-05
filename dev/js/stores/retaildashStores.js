import RetaildashDispatcher from '../dispatcher/retaildashDispatcher';
import Constants from '../constants/retaildashConstants';
import AppAPI from '../utils/appAPI';
import assign from 'object-assign';
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';
_items =[];

var RetaildashStore = assign({},EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener() {
    this.on('change', callback);
  },
  removeChangeListener() {
    this.removeListener('change', callback);
  }
});

RetaildashDispatcher.register(payload){
  var action = payload.action;

  switch(action.actionType){

  }

  return true;
}

export default RetaildashStore;