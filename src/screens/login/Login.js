import React, {Component} from 'react';
import "./Login.css";

import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { Input, InputLabel } from '@material-ui/core';

class Login extends Component {

    constructor() {
        super();
        this.validUsername = "user";            // This will act as the username used to login
        this.validPassword = "123";             // This will act as the password used to login
    }

    render() {
        console.log("==> Login.render() called");
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
                                <Button type="button" onClick={this.validate} variant="contained" color="primary">
                                    LOGIN
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    checkInput1 = (e) => {
        document.getElementsByClassName('required-text')[0].style.display = "none";
        document.getElementsByClassName('invalid')[0].style.display = "none";

        this.username = e.target.value;
        // console.log("username="+e.target.value);
    }

    checkInput2 = (e) => {
        document.getElementsByClassName('required-text')[1].style.display = "none";
        document.getElementsByClassName('invalid')[0].style.display = "none";

        this.password = e.target.value;
        // console.log("password="+e.target.value);
    }

    validate = () => {

        if(this.username === undefined || this.username === '' || this.password === undefined || this.password === '') {
            if(this.username === undefined || this.username === '') {
                document.getElementsByClassName('required-text')[0].style.display = "inline";
    
            }

            if(this.password === undefined || this.password === '') {
                document.getElementsByClassName('required-text')[1].style.display = "inline";
    
            }
        } else {
            
            if(this.username === this.validUsername && this.password === this.validPassword) {
                alert('Login successful');

                // Setting the access_token in the sessionStorage
                sessionStorage.setItem('access_token', '6410902345.32c1d21.63725367298c4a1084bf2d0d898858c8');
                
                // Redirecting to the Home page
                this.props.history.push('/home');

            } else {
                document.getElementsByClassName('invalid')[0].style.display = "inline";
            }
        }
    }
}

export default Login;