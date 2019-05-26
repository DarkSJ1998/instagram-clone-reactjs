import React, {Component} from 'react';
import "./Login.css";

import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { Input, InputLabel } from '@material-ui/core';

import {Link} from 'react-router-dom';

class Login extends Component {

    constructor() {
        super();
        this.username = "user";
        this.password = "123";
    }

    render() {
        console.log("Login.render() called");
        return (
            <div>
                <Header searchBar={false}/>

                <div className="container">
                    <Card className="login-card">
                        <CardContent>
                            <Typography variant="h5">
                                LOGIN
                            </Typography>
                            <br/>
                            <form id="loginForm">

                                <FormControl className="input">
                                    <InputLabel required>Username</InputLabel>
                                    <Input type="text" id="uname" name="uname" ref="uname" onChange={this.checkInputs} />
                                    <span className="required-text">required</span>
                                </FormControl>
                                <br/>
                                <FormControl className="input">
                                    <InputLabel required>Password</InputLabel>
                                    <Input type="password" id="pwd" name="pwd" ref="pwd" onChange={this.checkInputs} />
                                    <span className="required-text">required</span>
                                </FormControl>
                                <br/>
                                <span className="invalid">Incorrect username and/or password</span>
                                <br/>
                                <Link to='/home'>
                                <Button type="button" onClick={this.validate} variant="contained" color="primary">
                                    LOGIN
                                </Button>
                                </Link>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    checkInputs = (e) => {
        document.getElementsByClassName('required-text')[0].style.display = "none";
        document.getElementsByClassName('required-text')[1].style.display = "none";
        document.getElementsByClassName('invalid')[0].style.display = "none";

        console.log(this.refs.uname.defaultValue);
        console.log(e.target.value);
    }

    validate = () => {
        var uname = this.refs.uname.target;
        var pwd = this.refs.pwd;
        // console.log(uname);
        // console.log(pwd);
        if(uname === this.username && pwd === this.password) {
            alert('Login successful');
        } else if(uname === undefined && pwd === undefined) {
            document.getElementsByClassName('required-text')[0].style.display = "inline";
            document.getElementsByClassName('required-text')[1].style.display = "inline";
        } else {
            document.getElementsByClassName('invalid')[0].style.display = "inline";
        }
    }
}

export default Login;