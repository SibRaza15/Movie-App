const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DislikeSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
     },
     commentId: {
         type: Schema.Types.ObjectId,
         ref: 'Comment'
     },
     postId: {
        type: String,
    }
    

}, { timestamps: true })


const Dislike = mongoose.model('Dislike', DislikeSchema);

module.exports = { Dislike }

