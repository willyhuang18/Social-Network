const { Schema, model } = require('mongoose');

const usersSchema = new Schema(
    {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // validate email
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'thoughts'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }]
    },
    {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
    }
)