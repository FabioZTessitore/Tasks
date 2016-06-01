import { Meteor } from 'meteor/meteor';

import { check } from 'meteor/check';

import { Tasks } from './tasks.js';

Meteor.methods({
  "tasks.insert": (projectID, taskAttributes) => {
    check(projectID, String);
    check(taskAttributes, {
      title: String,
    });

    const lastTask = Tasks.findOne({
      projectID
    }, {
      fields: {
        rank: 1
      },
      sort: {
        rank: -1
      },
      limit: 1
    });
    let rank;
    if (lastTask) {
      rank = lastTask.rank + 1;
    } else {
      rank = 1;
    }

    const task = {
      projectID,
      title: taskAttributes.title,
      rank,
      createdAt: new Date(),
    };
    const _id = Tasks.insert(task);

    return {
      _id
    };
  },

  "tasks.toggleDone": (taskID, done) => {
    check(taskID, String);
    check(done, Boolean);

    Tasks.update(taskID, {
      $set: { done }
    });
  },

  "tasks.deleteDone": (projectID) => {
    Tasks.remove({
      projectID,
      done: true
    });

    const tasks_rank_update = Tasks.find({
      projectID,
    }, {
      fields: {
        _id: 1
      }
    }).fetch();

    let counter = 1;
    _.each(tasks_rank_update, (task) => {
      Tasks.update(task._id, { $set: { rank: counter } });
      counter++;
    });
  },
});
