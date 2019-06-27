import React, {Component} from 'react';
import "./Header.css";
import { IconButton, Input, InputAdornment } from '@material-ui/core';
import { Link } from 'react-router-dom';

class Header extends Component {

    render() {
        console.log("==> Header.render() called");

        return (
            <div className="header">
                {/* Using Google Web Fonts */}
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
                
                {
                    sessionStorage.getItem('access_token') === null
                    ? <Link to='/'><span className="logo">Image Viewer</span></Link>
                    : <Link to='/home'><span className="logo">Image Viewer</span></Link>
                }

                <span className="right-contents">
                {
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
                    )
                    : null
                }
                {
                    this.props.profile_picture !== undefined
                    ? (
                        <span id="dp-container">
                            <IconButton size="small" onClick={this.toggleDropdown}><img src={this.props.profile_picture} alt="..." className="profile-picture"/></IconButton>
                            <div className="dropdown dropdown-hidden" id="dropdown">
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
                    )
                    : null
                }
                </span>
            </div>
        );
    }

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
    }
}

export default Header;