import React, {Component} from 'react';
import "./Header.css";
import { IconButton, Input, InputAdornment } from '@material-ui/core';

class Header extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log("==> Header.render() called");

        return (
            <div className="header">
                {/* Using Google Web Fonts */}
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>

                <span className="logo">Image Viewer</span>

                {
                    this.props.searchBar === true
                    ? (
                        this.props.profile_picture
                        ? (
                            <span className="right-contents">
                                <Input 
                                    placeholder="Search..."
                                    className="search-bar"
                                    disableUnderline
                                    startAdornment={
                                        <InputAdornment position="start"><i className="material-icons">search</i></InputAdornment>
                                    }
                                    onChange={this.setSearchValue}
                                />
                                <IconButton size="small"><img src={this.props.profile_picture} alt="DP Here" className="profile-picture"/></IconButton>
                            </span>
                        )
                        : null
                    )
                    : null
                }
                
            </div>
        );
    }

    setSearchValue = (e) => {
        this.props.getSearchValue(e.target.value);
    }
}

export default Header;