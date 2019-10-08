const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    type: {
        type: String,
        default: 'personal'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('contact', ContactSchema);