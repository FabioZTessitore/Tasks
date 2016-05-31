import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Projects } from '../../../api/projects/projects.js';
import { Tasks } from '../../../api/tasks/tasks.js';

import './task_item.html';
import './tasks.html';

Template.Tasks.helpers({
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

Template.Tasks.events({
  "submit form": function(event) {
    event.preventDefault();

    const projectID = FlowRouter.getParam('id');
    const task = event.target.newTask;

    Tasks.insert({
      title: task.value,
      projectID
    });

    task.value = '';
  }
});
