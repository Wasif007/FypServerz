var client = require('twilio')('AC678ea2ec1d3504e754eaeffce34b6bea', '22c8728b18ee523c272c4efc44919e04');

module.exports.sendingMessage = function(req, res) {
  var messageToSend=req.body.message;
  client.messages.create({
    message:messageToSend,
    to: req.body.to,
    from: '+15124025641'
    // mediaUrl: 'http://www.yourserver.com/someimage.png'
  }, function(err, data) {
    if (err) {
      console.error('Could not notify administrator');
      console.error(err);
    } else {
      console.log('Administrator notified');
    }
  });
};