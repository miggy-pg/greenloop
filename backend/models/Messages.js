const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    conversationId: {
        type: String,
    },
    senderId: {
        type: String
    },
    message: {
        type: String
    },
    hasRead :{
        type: Boolean,
        default: false
    }
});

const Messages = mongoose.model('Message', messageSchema);

module.exports = Messages;