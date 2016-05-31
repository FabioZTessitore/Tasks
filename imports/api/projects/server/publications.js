import { Meteor } from 'meteor/meteor';

import { Projects } from '../projects.js';

Meteor.publish('projects', () => {
  return Projects.find();
});
