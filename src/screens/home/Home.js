import React, {Component} from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import { Card, CardContent, CardHeader, IconButton, Input, Button, InputLabel, FormControl } from '@material-ui/core';
import {Redirect} from 'react-router-dom';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            profile_picture: '',
            object1: null,
            object2: null,
            client_id: '32c1d219b1fd474bb51342773597a80a',
            access_token: sessionStorage.getItem('access_token'),        // Getting the access_token from the sessionStorage
            allComments: []
        }
    }

    render() {
        console.log("==> Home.render() called");
        // console.log(this.state.allComments);
        // console.log(this.props);
        if(sessionStorage.getItem('access_token') === null) {       // if the user is trying to open '/home' directly
            alert('You must be logged in to do that')
            return <Redirect to='/'/>;
        }
        else {
            return (
                <div className="main-container">

                    <Header searchBar={true} profile_picture={this.state.profile_picture} getSearchValue={this.getSearchValue} calledFrom="Home"/>
                    <div className="container">
                        {
                            this.state.object2 !== null
                            ? (
                                this.state.object2.data.map(this.getPosts)
                            )
                            : (
                                <h5>Loading...</h5>
                            )
                        }
                    </div>
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

            // console.log(object1);
            // console.log(object2);

            this.setState({object1: object1, object2: object2, profile_picture: object1.data.profile_picture});
        }
    }

    getSearchValue = (val) => {
        this.setState({searchValue: val});
    }

    getPosts = (item) => {

        if(item.caption && (item.caption.text.indexOf(this.state.searchValue) !== -1 || this.state.searchValue === '')) {

            var d = new Date(item.created_time * 1000);         // converting unix_timestamp to milliseconds
            var date = d.toLocaleDateString();
            var time = d.toLocaleTimeString();

            return (
                <Card key={item.id} className="post-card">
                    <CardHeader
                        avatar={
                        <IconButton><img src={item.user.profile_picture} alt={item.user.username} className="post-pp"/></IconButton>
                        }
                        title={
                            <div className="title-box">
                                <p className="title-username">{item.user.username}</p>
                                <p className="title-date">{date + " " + time}</p>
                            </div>
                        }
                        subheader={
                            null
                        }
                        className="post-header"
                    />

                    <CardContent className="post-content">
                        <div className="img-container">
                            <img src={item.images.standard_resolution.url} alt={item.id}/>
                        </div>

                        <hr color="#DFDFDF"/>

                        <div className="caption-container">
                            {
                                item.caption !== null
                                ? <p dangerouslySetInnerHTML={{ __html: this.renderHashtags(item.caption.text) }}></p>
                                : null
                            }
                        </div>

                        <div className="like-container">
                            {
                                item.user_has_liked === true
                                ? <i className="material-icons like-btn" onClick={this.toggleLikes} id={item.id} style={{color: 'red'}}>favorite</i>
                                : <i className="material-icons like-btn" onClick={this.toggleLikes} id={item.id}>favorite_border</i>
                            }
                            <span id={"like="+item.id}> {item.likes.count} likes</span>
                        </div>

                        <div className="comments-container">
                            <div id={"comment-box="+item.id} className="comment-box">
                                {
                                    this.state.allComments.map( this.printComment, item.id )
                                }
                            </div>

                            <div className="add-comment">
                                <FormControl fullWidth>
                                    <InputLabel>Add a comment</InputLabel>
                                    <Input onChange={this.saveCommentText} className="comment-input" id={"add-comment="+item.id}/>
                                </FormControl>

                                <Button type="button" id={"comment-btn="+item.id} onClick={this.addComment} variant="contained" color="primary" className="comment-btn">ADD</Button>
                            </div>
                        </div>
                    </CardContent>

                </Card>
            );
        }
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

    saveCommentText = (e) => {
        this.comment_text = e.target.value;
        console.log(this.comment_text);
    }

    addComment = (e) => {
        console.log(e.target);
        var item_id = e.target.id.substring(12,e.target.id.length+1);
        // console.log(item_id);

        // var comment_box = document.getElementById("comment-box="+item_id);
        // console.log(comment_box);
        
        if(this.comment_text !== undefined && this.comment_text !== null && this.comment_text !== '') {
            var arr = this.state.allComments;

            var comment = {
                comment_item_id: item_id,
                poster: this.state.object1.data.username,
                text: this.comment_text
            };
            arr.push(comment);
            // console.log(comment);
            // console.log(arr);

            document.getElementById("add-comment="+item_id).value = '';

            this.setState({
                allComments: arr
            });
        }
    }

    // This function is not an arrow function because I needed to use the parameter that I sent to the mapped function
    printComment(item) {
        // console.log("MAP CALLED FOR");
        // console.log(item.comment_item_id);
        // console.log(this);
        if(item.comment_item_id === this) {
            return (
                <div className="comment" key={"commentid="+Math.random()}>
                    <p className="poster">{item.poster}: </p>
                    <p className="comment-text">{item.text}</p>
                </div>
            );
        } else
            return null;
    }
}

export default Home;