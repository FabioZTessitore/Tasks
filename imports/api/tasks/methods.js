import { Meteor } from 'meteor/meteor';

import { check } from 'meteor/check';
import { Match } from 'meteor/check';

import { Tasks } from './tasks.js';

Meteor.methods({
  "tasks.insert": (projectID, taskAttributes) => {
    check(projectID, String);
    check(taskAttributes, {
      title: String,
      rank: Match.Integer,
    });

    const task = {
      projectID,
      title: taskAttributes.title,
      rank: taskAttributes.rank,
      createdAt: new Date(),
    };
    const _id = Tasks.insert(task);

    return {
      _id
    };
  },
});
