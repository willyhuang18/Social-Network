const { Schema, model, Types } = require('mongoose');
const moment = require('moment');


const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      toJSON: {
        getters: true,
      }
    }
)

const thoughtsSchema = new Schema(
    {
        thoughts: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
          },
        username: {
            type: String,
            required: true
            },
        // validate data
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
        }
)

// using virtual method to count the reactions
thoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});