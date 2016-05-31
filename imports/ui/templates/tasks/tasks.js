import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Projects } from '../../../api/projects/projects.js';
import { Tasks } from '../../../api/tasks/tasks.js';

import './task_item.js';
import './tasks.html';

Template.tasksList.helpers({
  projectTitle() {
    const projectID = FlowRouter.getParam('id');
    const project = Projects.findOne(projectID);

    if (project) {
      return project.title;
    }
  },

  tasks() {
    const projectID = FlowRouter.getParam('id');

    return Tasks.find({projectID});
  },
});

Template.tasksList.events({
  "submit form": function(event) {
    event.preventDefault();

    const projectID = FlowRouter.getParam('id');
    const task = event.target.newTask;

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

    Tasks.insert({
      title: task.value,
      projectID,
      rank
    });

    task.value = '';
  },

  "click .delete_tasks_done": function(event) {
    event.preventDefault();

    const projectID = FlowRouter.getParam('id');

    const task_to_remove = Tasks.find({
      projectID,
      done: true
    }, {
      fields: {
        _id: 1
      }
    }).fetch();

    _.each(task_to_remove, (task) => {
      Tasks.remove(task._id);
    });
  }
});
