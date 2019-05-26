import React, {Component} from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import { Card, CardContent, CardHeader, IconButton, Input, Button, InputLabel, FormControl } from '@material-ui/core';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            profile_picture: '',
            object1: null,
            object2: null,
            client_id: '32c1d219b1fd474bb51342773597a80a',
            access_token: '6410902345.32c1d21.63725367298c4a1084bf2d0d898858c8',
            access_token2: '8661035776.d0fcd39.87fd934e04f84253aaf234d8bd4e4c65'
        }
    }

    render() {
        // console.log(this.state.object2);
        return (
            <div className="main-container">

                <Header searchBar={true} profile_picture={this.state.profile_picture} getSearchValue={this.getSearchValue}/>
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

    async componentDidMount() {
        const url1 = "https://api.instagram.com/v1/users/self/?access_token="+this.state.access_token;
        const url2 = "https://api.instagram.com/v1/users/self/media/recent?access_token="+this.state.access_token;
        const res1 = await fetch(url1);
        const object1 = await res1.json();

        const res2 = await fetch(url2);
        const object2 = await res2.json();

        console.log(object1);
        console.log(object2);

        // this.setState({profile_picture: object1.data.profile_picture});
        this.setState({object1: object1, object2: object2});
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
                            <div id={"comment-box="+item.id}>
                            {console.log(this.state)}
                            {
                                this.state['cmt='+item.id]
                                ? this.state['cmt='+item.id].map(this.printComment)
                                : null
                            }
                            </div>

                            <FormControl className="comment-box">
                                <InputLabel>Add a comment</InputLabel>
                                <Input onChange={this.saveCommentText}/>
                            </FormControl>

                            <Button type="button" id={"comment-btn="+item.id} onClick={this.addComment} variant="contained" color="primary" className="comment-btn">ADD</Button>
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

        var comment_box = document.getElementById("comment-box="+item_id);
        // console.log(comment_box);

        var x = 'cmt='+item_id;
        if(this.state[x] === undefined) {
            this.state = {
                x: []
            };
        }

        var arr = this.state[""+x];

        if(this.state.object1) {
            arr.push({
                poster: this.state.object1.data.username,
                text: this.comment_text
            });
        }

        this.setState({x: arr});
        console.log(arr);
    }

    printComment = (item) => {
        return (
            <div className="comment">
                <p className="poster">{item.poster}</p>
                <p className="comment-text">{item.text}</p>
            </div>
        );
    }
}

export default Home;