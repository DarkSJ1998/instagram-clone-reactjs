import React, {Component} from 'react';
import "./Header.css";
import { IconButton, Input, InputAdornment } from '@material-ui/core';

class Header extends Component {

    constructor(props) {
        super(props);
        this.url = "https://scontent.cdninstagram.com/vp/aeef80e54ff07c58faf7e88c25ab7f46/5D7FD499/t51.2885-19/s150x150/31103649_272371546700655_37276871565508608_n.jpg?_nc_ht=scontent.cdninstagram.com"
    }

    render() {
        console.log("Header.render() called");
        return (
            <div className="header">
                {/* Using Google Web Fonts */}
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>

                <span className="logo">Image Viewer</span>

                {
                    this.props.searchBar === true
                    ? (
                        this.url
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
                                <IconButton size="small"><img src={this.url} alt="DP Here" className="profile-picture"/></IconButton>
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