import React, {Component} from 'react';
import Login from './screens/login/Login';
import Home from './screens/home/Home';

import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {

    constructor() {
        super();
        this.state = {
            firstRun: true
        }
    }

    render() {
        if(this.state.firstRun === true) {

        } else {
            
        }
        return (
            <Router>
                <div>
                    <Route exact path='/home' render={() => <Home/>} />
                    <Route exact path='/' component={Login} />
                </div>
            </Router>
        );
    }
}

export default App;