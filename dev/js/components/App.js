import React from 'react';
import RetaildashActions from '../actions/retaildashActions';
import RetaildashStore from '../stores/retaildashStores';

class App extends React.Component {
    getAppState() {
        return {};
    }

    getInitialState() {
        getAppState()
    }

    componentDidMount() {
        RetaildashStore.addChangeListener(this._onChange);
    }

    componentUnmount() {
        RetaildashStore.removeChangelistener(this._onChange);
    }

    render() {
        return(
            <div>
                My App
            </div>
        );
    }
    _onChange() {
        this.setState(getAppState());
    }
}

export default App;