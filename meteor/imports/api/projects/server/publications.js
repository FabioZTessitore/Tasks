import { Meteor } from 'meteor/meteor';

import { Projects } from '../projects.js';

Meteor.publish('projects', function() {
  if (this.userId) {
    return Projects.find({ owner: this.userId });
  }
});
