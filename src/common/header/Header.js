import React, {Component} from 'react';
import "./Header.css";

import { IconButton, Input, InputAdornment } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';

class Header extends Component {

    render() {

        return (
            <div className="header">

                {/* Using Google Web Fonts */}
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
                
                { // Conditional Rendering of Links depending on the page which renders <Header/>

                    sessionStorage.getItem('access_token') === null
                    ? <Link to='/'><span className="logo">Image Viewer</span></Link>
                    : <Link to='/home'><span className="logo">Image Viewer</span></Link>
                }

                <span className="right-contents">

                    { // if the search bar is to be displayed

                        this.props.searchBar === true
                        ? (
                            <span id="searchbar-container">
                                <Input 
                                    placeholder="Search..."
                                    className="search-bar"
                                    disableUnderline
                                    startAdornment={
                                        <InputAdornment position="start"><i className="material-icons">search</i></InputAdornment>
                                    }
                                    onChange={this.setSearchValue}
                                />
                            </span>
                        ) : null
                    }

                    { // if the user has logged in and profile_picture is found in the response

                        this.props.profile_picture !== undefined
                        ? (
                            <span id="dp-container">
                                
                                <IconButton size="small" onClick={this.toggleDropdown}>
                                    <img src={this.props.profile_picture} alt="" className="profile-picture"/>
                                </IconButton>

                                <div className="dropdown dropdown-hidden" id="dropdown">

                                    {/* Conditionally rendering the dropdown menu tabs */}

                                    {
                                        this.props.calledFrom === 'Home'
                                        ? (<span><Link to='/profile'>My Account</Link></span>)
                                        : null
                                    }

                                    {
                                        this.props.calledFrom === 'Home'
                                        ? <hr/>
                                        : null
                                    }

                                    <span onClick={this.logout}><Link to='/'>Logout</Link></span>

                                </div>

                            </span>
                        ) : null
                    }

                </span>

            </div>
        );
    }

    // sending back the search value to the parent component
    setSearchValue = (e) => {
        
        this.props.getSearchValue(e.target.value);
    }

    toggleDropdown = () => {

        var dropdown = document.getElementById("dropdown");
        var display = dropdown.getAttribute('class');

        if(display === 'dropdown dropdown-hidden') {
            dropdown.setAttribute('class','dropdown dropdown-visible');
        } else {
            dropdown.setAttribute('class','dropdown dropdown-hidden');
        }
    }

    logout = () => {

        sessionStorage.removeItem('access_token');       // Removing the access_token from sessionStorage
        return <Redirect to="/" />
    }
}

export default Header;