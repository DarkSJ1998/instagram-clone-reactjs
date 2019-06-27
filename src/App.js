import React, {Component} from 'react';
import Login from './screens/login/Login';
import Home from './screens/home/Home';
import Profile from './screens/profile/Profile';

import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Route exact path='/home' render={() => <Home calledFrom="App"/>} />
                    <Route exact path='/' component={Login} />
                    <Route exact path='/profile' component={Profile} />
                </div>
            </Router>
        );
    }
}

export default App;