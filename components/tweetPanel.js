import React from 'react';
import PropTypes from 'prop-types';
import TweetFrame from './tweetFrame';
import style from './tweetPanel.css';

class tweetPanel extends React.Component {
  componentDidMount () {

  }

  renderTweets () {
    let tweets = [];

    this.props.tweets.forEach((current) => {
      tweets.push(current.id);
    }
  );

    return tweets;
  }

  render () {
    return (
      <div className={style.TweetPanel} >
        {
          this.props.tweets.map((current) => <TweetFrame tweet={current} key={current.id} />)
        }
      </div>
    );
  }
}

tweetPanel.propTypes = {
  tweets: PropTypes.array.isRequired
};

export default tweetPanel;
