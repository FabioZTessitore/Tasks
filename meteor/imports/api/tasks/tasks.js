import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Tasks = new Mongo.Collection('tasks');

const TaskSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        autoform: {
            label: false
        }
    },

    done: {
        type: Boolean,
        label: "Done",
        defaultValue: false,
        autoform: {
            type: "hidden"
        }
    },

    projectID: {
        type: String,
        defaultValue: 0,
        autoform: {
            type: "hidden"
        }
    },

    rank: {
        type: Number,
        defaultValue: 0,
        autoform: {
            type: "hidden"
        }
    },

    createdAt: {
        type: Date,
        autoValue: function() {
            return new Date();
        },
        autoform: {
            type: "hidden"
        }
    }
});

Tasks.attachSchema(TaskSchema);
