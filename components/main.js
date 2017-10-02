import React from 'react';
import SearchBar from './searchBar';
import TweetPanel from './tweetPanel';
import style from './main.css';
import AppBar from 'material-ui/AppBar';

class Main extends React.Component {
  constructor () {
    super();
    this.state = {
      tweets: []
    };
  }

  componentDidMount () {
    this.socket = new WebSocket('ws://127.0.0.1:3000/tweetWS');
    this.socket.onmessage = (data) => this.addTweet(JSON.parse(data.data));
  }

  addTweet (tweet) {
    let tweetList = this.state.tweets.slice();
    tweetList.push(tweet);

    if (tweetList.length > 3) {
      tweetList.shift();
    }

    this.setState({
      tweets: tweetList
    });
  }

  search (value) {
    if (!this.socket) this.connectSocket();
    this.setState({
      tweets: []
    });
    this.socket.send(value);
  }

  render () {
    return (
      <div className={style.Main} >
        <AppBar title='Hashtag Viewer' iconElementLeft={<SearchBar onSearch={this.search.bind(this)} />} />
        <TweetPanel tweets={this.state.tweets} />
      </div>
    );
  }
}

export default Main;
