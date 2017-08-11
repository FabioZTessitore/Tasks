import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Projects = new Mongo.Collection('projects');

const ProjectSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        autoform: {
            placeholder: "Add A Project",
            label: false
        }
    },

    owner: {
        type: String,
        autoValue: function() {
            return this.userId;
        },
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

Projects.attachSchema(ProjectSchema);
