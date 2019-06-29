import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

import './Profile.css';
import Header from '../../common/header/Header';
import { Button, Fab, GridList, GridListTile, Modal, IconButton, FormControl, InputLabel, Input, Typography } from '@material-ui/core';

class Profile extends Component {

    constructor() {

        super();
        this.state = {
            profile_picture: '',
            object1: null,
            object2: null,
            access_token: sessionStorage.getItem('access_token'),        // Getting the access_token from the sessionStorage
            modal_object: null,
            allComments: []                                              // The array of objects to store the comments
        }
    }

    render() {

        if(sessionStorage.getItem('access_token') === null) {       // if the user is trying to open '/profile' directly

            alert('You must be logged in to do that')
            return <Redirect to='/'/>;                              // redirecting back to login page

        } else {
            return (

                <div className="main-container">

                    <Header profile_picture={this.state.profile_picture} calledFrom="Profile" />
                    
                    {/* Using Google Web Fonts */}
                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>

                    <div className="container">
                        { // waiting till the response is received from server for API call 1

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
                                            <Fab color="secondary" onClick={this.showChangeNameModal}><i className="material-icons">edit</i></Fab>

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
                        { // waiting till the response is received from server for API call 2

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
                    
                    { // waiting till the response is received from server and modal_object is set in the state variable

                        this.state.modal_object !== null
                        ? ( // Modal for displaying images

                            <Modal open={true} className="modal" id="modal" onClose={this.closeModal}>

                                <div className="modal-container">

                                    <div className="modal-left-container">
                                        <img src={this.state.modal_object.images.standard_resolution.url} alt={this.state.modal_object.id} />
                                    </div>

                                    <div className="modal-right-container">

                                        <span className="modal-header">

                                            <IconButton className="avatar">
                                                <img src={this.state.modal_object.user.profile_picture} alt={this.state.modal_object.user.id}/>
                                            </IconButton>
                                            {this.state.modal_object.user.username}

                                            <hr color="#DFDFDF" />

                                            <div className="caption-container">
                                                {
                                                    this.state.modal_object.caption !== null
                                                    ? <span dangerouslySetInnerHTML={{ 
                                                        __html: this.renderHashtags(this.state.modal_object.caption.text)
                                                        }}></span>
                                                    : null
                                                }
                                            </div>

                                        </span>

                                        <span className="modal-body">
                                        
                                            <div className="comments-container">
                                                <div id={"comment-box="+this.state.modal_object.id} className="comment-box-profilepage">
                                                    {
                                                        this.state.allComments.map( this.printComment, this.state.modal_object.id )
                                                    }
                                                </div>
                                                
                                                <div className="like-container">
                                                    {
                                                        this.state.modal_object.user_has_liked === true
                                                        ? <i className="material-icons like-btn" onClick={this.toggleLikes}
                                                            id={this.state.modal_object.id} style={{color: 'red'}}>favorite</i>
                                                        : <i className="material-icons like-btn" onClick={this.toggleLikes}
                                                            id={this.state.modal_object.id}>favorite_border</i>
                                                    }
                                                    <span id={"like="+this.state.modal_object.id}> {this.state.modal_object.likes.count} likes</span>
                                                </div>

                                                <div className="add-comment">
                                                    <FormControl fullWidth>
                                                        <InputLabel>Add a comment</InputLabel>
                                                        <Input onChange={this.saveCommentText} className="comment-input" id={"add-comment="+this.state.modal_object.id} defaultValue={this.comment_text}/>
                                                    </FormControl>

                                                    <Button type="button" id={"comment-btn="+this.state.modal_object.id} onClick={this.addComment} variant="contained" color="primary" className="comment-btn">ADD</Button>
                                                </div>
                                            </div>

                                        </span>
                                    
                                    </div>
                                
                                </div>
                            
                            </Modal>

                        )
                        : null
                    }
                    
                    {/* Modal for changing full name */}
                    <Modal open={true} className="modal2" id="change-name-modal" onClose={this.hideChangeNameModal}>
                        <div className="modal2-container">
                            <div className="modal-header">
                                <Typography variant="h6">Edit</Typography>
                            </div>
                            
                            <div className="modal-body">
                                <FormControl fullWidth>
                                    <InputLabel required>Full Name</InputLabel>
                                    <Input type="text" id="fullname" name="fullname" onChange={this.checkNameInput} />
                                    <span className="required-text">required</span>
                                </FormControl>
                            </div>

                            <br/>

                            <div className="modal-footer">
                                <Button type="button" variant="contained" color="primary" onClick={this.changeName}>Update</Button>
                            </div>
                        </div>
                    </Modal>
                </div>
            );
        }
    }

    async componentDidMount() {

        if(sessionStorage.getItem('access_token') !== null) {         // if the user is trying to open '/home' directly
        
            const url1 = "https://api.instagram.com/v1/users/self/?access_token="+this.state.access_token;
            const url2 = "https://api.instagram.com/v1/users/self/media/recent?access_token="+this.state.access_token;

            // Making the API calls and fetching data into objects
            const res1 = await fetch(url1);
            const object1 = await res1.json();

            const res2 = await fetch(url2);
            const object2 = await res2.json();
            
            // Saving the objects received in state variable
            this.setState({
                object1: object1,
                object2: object2,
                profile_picture: object1.data.profile_picture,
                modal_object: object2.data[0]
            });
        }
    }

    getImages = (item) => {

        return (
            <GridListTile key={"tile="+item.id} rows={1.5}>
                <img src={item.images.standard_resolution.url} alt={"thumbnail="+item.id}
                    id={"thumbnail="+item.id} className="grid-item" onClick={this.showModal} />
            </GridListTile>
        )
    }

    showChangeNameModal = (e) => {

        document.getElementById("change-name-modal").style.display = 'flex';
    }

    hideChangeNameModal = (e) => {

        document.getElementById("change-name-modal").style.display = 'none';
    }

    checkNameInput = (e) => {

        document.getElementsByClassName('required-text')[0].style.display = "none";
        this.newname = e.target.value;
    }

    changeName = () => {

        if(this.newname === undefined || this.newname === '')
            document.getElementsByClassName('required-text')[0].style.display = "inline";
        else {
            // Getting the value of object from state
            var new_object1 = this.state.object1;

            // Changing the data.full_name value inside the object
            new_object1.data.full_name = this.newname;

            // hiding the modal after changing name
            this.hideChangeNameModal();

            // Making the input fields and data as null for the next time the button is pressed
            document.getElementById("fullname").value = '';
            this.full_name = '';
            
            // Updating the new object1 with new name in the state variable
            this.setState({object1: new_object1});
        }
    }

    showModal = (e) => {

        // for extracting the image's unique id from the id assigned to the image
        var item_id = e.target.id.substring(10, e.target.id.length+1);

        // finding the particular object in the response received
        var obj = this.state.object2.data.find( (item) => {
            return item.id === item_id;
        });

        document.getElementById("modal").style.display = 'flex';

        // setting the object into state so that it can be accessed by the modal
        this.setState({modal_object: obj});
    }

    closeModal = () => {

        document.getElementById("modal").style.display = 'none';
    }

    toggleLikes = (e) => {

        var object = e.target;
        var likeIcon = document.getElementById(object.id);
        var likeText = document.getElementById('like='+object.id);
        var count = parseInt(likeText.innerHTML);

        if(object.innerHTML === 'favorite_border') {
            likeIcon.innerHTML = 'favorite';
            likeIcon.style.color = "red";
            likeText.innerHTML = count+1 + " likes";
        } else {
            likeIcon.innerHTML = 'favorite_border';
            likeIcon.style.color = "black";
            likeText.innerHTML = count-1 + " likes";
        }
    }

    renderHashtags = (text) => {

        var result = "";
        
        for(var i=0;i<text.length;i++) {
            var ch=text.charAt(i);
            if(ch === '#' || ch === '@') {
                result += '<span class="tag">';
                
                while(ch !== ' ' && i<text.length) {
                    result += ch;
                    i++;
                    ch=text.charAt(i);
                }
                i--;
                result += '</span>';
            } else {
                result += ch;
            }
        }
        
        return result;
    }

    // for saving the text entered into a comment box
    saveCommentText = (e) => {

        this.comment_text = e.target.value;
    }

    addComment = (e) => {
        
        // for extracting the image's unique id from the id assigned to the comment button
        var item_id = e.target.id.substring(12,e.target.id.length+1);
        
        // only executing in case something is entered inside the comment box
        if(this.comment_text !== undefined && this.comment_text !== null && this.comment_text !== '') {

            // getting the current allComments object from state
            var arr = this.state.allComments;

            var comment = {
                comment_item_id: item_id,
                poster: this.state.object1.data.username,
                text: this.comment_text
            };

            arr.push(comment);

            // emptying the comment box
            document.getElementById("add-comment="+item_id).value = '';

            // putting the updated allComments object into state
            this.setState({
                allComments: arr
            });

        }
    }

    // This function is not an arrow function because I needed to use the parameter that I sent to the mapped function
    printComment(item) {
        
        if(item.comment_item_id === this) {
            return (
                <div className="comment" key={"commentid="+Math.random()}>
                    <span className="poster">{item.poster}: </span>
                    <span className="comment-text">{item.text}</span>
                </div>
            );
        } else
            return null;
    }
}

export default Profile;