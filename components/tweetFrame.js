import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardMedia} from 'material-ui/Card';
import style from './tweetFrame.css';
import moment from 'moment';

class tweetFrame extends React.Component {
  componentDidMount () {

  }

  render () {
    let date = moment(this.props.tweet.created_at);
    let userName = this.props.tweet.user.name;
    let imageURL = this.props.tweet.entities.media[0].media_url;
    let profileImageURL = this.props.tweet.user.profile_image_url;

    return (
      <div className={style.TweetFrame} >
        <Card className={style.TweetCard} >
          <CardMedia>
            <img src={imageURL} alt='' />
          </CardMedia>
          <CardHeader
            title={userName}
            subtitle={date.format('D/M/Y h:mm:ss a')}
            avatar={profileImageURL}
          />
        </Card>
      </div>
    );
  }
}

tweetFrame.propTypes = {
  tweet: PropTypes.object.isRequired
};

export default tweetFrame;
