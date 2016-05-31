import { Meteor } from 'meteor/meteor';

import { Tasks } from '../tasks.js';

Meteor.publish('tasks', function(projectID) {
  check(projectID, String);
  return Tasks.find({projectID});
});
