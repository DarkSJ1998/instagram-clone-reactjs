import React, {Component} from 'react';
import "./Login.css";
import LoadingSVG from '../../assets/Rolling-1s-200px.svg';

import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { Input, InputLabel } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

class Login extends Component {

    constructor() {
        super();
        this.validUsername = "user";            // This will act as the username used to login
        this.validPassword = "123";             // This will act as the password used to login
    }

    render() {

        if(sessionStorage.getItem('access_token') !== null) {       // if the user is logged in and trying to open '/' directly
            
            alert('You will be redirected to the home page shortly.');
            return <Redirect to='/home'/>;
            
        } else {
            return (
                <div>
                    <Header searchBar={false} calledFrom="Login"/>

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
                                        <Input type="text" id="uname" name="uname" ref="uname" onChange={this.checkInput1} />
                                        <span className="required-text">required</span>
                                    </FormControl>

                                    <br/>
                                    <FormControl className="input">
                                        <InputLabel required>Password</InputLabel>
                                        <Input type="password" id="pwd" name="pwd" ref="pwd" onChange={this.checkInput2} />
                                        <span className="required-text">required</span>
                                    </FormControl>

                                    <br/>
                                    <span className="invalid">Incorrect username and/or password</span>

                                    <br/>
                                    <span style={{
                                        display: 'flex'
                                    }}>
                                        <Button type="button" onClick={this.validate} variant="contained" color="primary">
                                            LOGIN
                                        </Button>

                                        {/* In case loading the next page takes some time, a loading spinner is displayed, initially hidden */}

                                        <img src={LoadingSVG} alt="loading-spinner" style={{
                                                width: '25px',
                                                marginLeft: '10px',
                                                display: 'none'
                                        }} id="loading-spinner"/>
                                    </span>

                                </form>

                            </CardContent>
                        </Card>

                    </div>

                </div>
            );
        }
    }

    // for saving the value of username input field so that it can be accessed later
    checkInput1 = (e) => {
        document.getElementsByClassName('required-text')[0].style.display = "none";
        document.getElementsByClassName('invalid')[0].style.display = "none";

        this.username = e.target.value;
    }

    // for saving the value of password input field so that it can be accessed later
    checkInput2 = (e) => {
        document.getElementsByClassName('required-text')[1].style.display = "none";
        document.getElementsByClassName('invalid')[0].style.display = "none";

        this.password = e.target.value;
    }

    validate = () => {

        // if the username or password field is left empty
        if(this.username === undefined || this.username === '' || this.password === undefined || this.password === '') {

            // if the username field is left empty
            if(this.username === undefined || this.username === '') {
                document.getElementsByClassName('required-text')[0].style.display = "inline";
    
            }

            // if the password field is left empty
            if(this.password === undefined || this.password === '') {
                document.getElementsByClassName('required-text')[1].style.display = "inline";
    
            }

        } else {
            
            // if the username and password entered is valid
            if(this.username === this.validUsername && this.password === this.validPassword) {

                // making the loading spinner visible
                document.getElementById("loading-spinner").style.display = '';

                // Setting the access_token in the sessionStorage
                sessionStorage.setItem('access_token', '6410902345.32c1d21.63725367298c4a1084bf2d0d898858c8');
                
                // Redirecting to the Home page
                this.props.history.push('/home');

            } else {

                // if the username and password entered is invalid
                document.getElementsByClassName('invalid')[0].style.display = "inline";
            }
        }
    }
}

export default Login;