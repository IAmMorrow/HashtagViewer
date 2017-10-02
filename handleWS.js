import config from './config.json';
import Twit from 'twit';

var client = new Twit(config.twitter);

function refreshTweets (filter, ws, context) {
  console.log('refreshing tweets', context, ' filter: ', filter + ' has:media');

  var params = {
    q: filter,
    include_entities: true,
    count: 50,
    result_type: 'mixed'
  };

  if ('lastId' in context) params.since_id = context.lastId;

  client.get('search/tweets', params, function (err, data, response) {
    if (err) console.log(err);
    data.statuses.sort((a, b) => a.id - b.id).forEach((current) => {
      if (!context.lastId || current.id > context.lastId) {
        if ('media' in current.entities) ws.send(JSON.stringify(current));
        context.lastId = current.id;
      }
    });
  });
}

function handleSocket (ws, res) {
  var timer;

  ws.on('message', (message) => {
    console.log('got msg');
    if (timer) clearInterval(timer);
    var context = {};
    refreshTweets(message, ws, context);
    timer = setInterval(refreshTweets, 10000, message, ws, context);
  });

  ws.on('close', () => {
    console.log('closed socket');
    if (timer) clearInterval(timer);
  });
}

module.exports = handleSocket;
