import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

import './Profile.css';
import Header from '../../common/header/Header';
import { Button, Fab, GridList, GridListTile, Modal, IconButton } from '@material-ui/core';

class Profile extends Component {

    constructor() {
        super();
        this.state = {
            profile_picture: '',
            object1: null,
            object2: null,
            access_token: sessionStorage.getItem('access_token'),        // Getting the access_token from the sessionStorage
            modal_object: null
        }
    }
    render() {
        
        console.log("==> Profile.render() called");

        if(sessionStorage.getItem('access_token') === null) {       // if the user is trying to open '/profile' directly

            alert('You must be logged in to do that')
            return <Redirect to='/'/>;
        } else {
            return (
                <div className="main-container">
                    <Header profile_picture={this.state.profile_picture} calledFrom="Profile" />
                    
                    {/* Using Google Web Fonts */}
                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>

                    <div className="container">
                        {
                            this.state.object1 !== null
                            ? (
                                <div className="user-info">
                                    <div className="user-profile-photo">
                                        <img src={this.state.object1.data.profile_picture} alt="user-profile" />
                                    </div>
                                    <div className="data">
                                        <h2>{this.state.object1.data.username}</h2>

                                        <span className="counts">
                                            <span>Posts: {this.state.object1.data.counts.media}</span>
                                            <span>Follows: {this.state.object1.data.counts.follows}</span>
                                            <span>Followed By: {this.state.object1.data.counts.followed_by}</span>
                                        </span>

                                        <h2>
                                            <span className="user-full-name">{this.state.object1.data.full_name}</span>
                                            <Fab color="secondary" onClick={this.changeNameModal}><i className="material-icons">edit</i></Fab>

                                            {/*
                                                Did not use the below one as it will be removed from material-ui soon
                                                <Button variant="fab" color="secondary"><i className="material-icons">edit</i></Button>
                                            */}
                                        </h2>
                                        

                                        <span className="bio">{this.state.object1.data.bio}</span>

                                        <span className="website">{this.state.object1.data.website}</span>
                                    </div>
                                </div>
                            )
                            : (
                                <h5>Loading...</h5>
                            )
                        }
                        {
                            this.state.object2 !== null
                            ? (
                                <div className="grid-container">
                                    <GridList cellHeight={180} cols={3}>
                                        {this.state.object2.data.map(this.getImages)}
                                    </GridList>
                                    
                                </div>
                            ) : null
                        }

                    </div>
                    
                    {
                        this.state.modal_object !== null
                        ? (
                            <Modal open={true} className="modal" id="modal" onClose={this.closeModal}>

                                <div className="modal-container">

                                    <div className="modal-left-container">
                                        <img src={this.state.modal_object.images.standard_resolution.url} alt={this.state.modal_object.id} />
                                    </div>

                                    <div className="modal-right-container">
                                        <span className="modal-header">
                                            <IconButton className="avatar"><img src={this.state.modal_object.user.profile_picture} alt={this.state.modal_object.user.id}/></IconButton>
                                            {this.state.modal_object.user.username}
                                        </span>

                                        <hr/>

                                        <span>{this.state.modal_object.caption.text}</span>
                                    </div>

                                </div>

                            </Modal>
                        )
                        : null
                    }
                    
                </div>
            );
        }
    }

    async componentDidMount() {
        if(sessionStorage.getItem('access_token') !== null) {
        
            const url1 = "https://api.instagram.com/v1/users/self/?access_token="+this.state.access_token;
            const url2 = "https://api.instagram.com/v1/users/self/media/recent?access_token="+this.state.access_token;
            const res1 = await fetch(url1);
            const object1 = await res1.json();

            const res2 = await fetch(url2);
            const object2 = await res2.json();

            console.log(object1);
            console.log(object2);

            this.setState({object1: object1, object2: object2, profile_picture: object1.data.profile_picture, modal_object: object2.data[0]});
        }
    }

    getImages = (item) => {
        return (
            <GridListTile key={"tile="+item.id} rows={2}>
                <img src={item.images.standard_resolution.url} alt={"thumbnail="+item.id} id={"thumbnail="+item.id} className="grid-item" onClick={this.showModal}/>
            </GridListTile>
        )
    }

    changeNameModal = (e) => {

    }

    showModal = (e) => {
        var item_id = e.target.id.substring(10, e.target.id.length+1);
        var obj = this.state.object2.data.find( (item) => {
            return item.id === item_id;
        });

        console.log(obj);

        document.getElementById("modal").style.display = 'flex';
        this.setState({modal_object: obj});
    }

    closeModal = () => {
        document.getElementById("modal").style.display = 'none';
    }
}

export default Profile;