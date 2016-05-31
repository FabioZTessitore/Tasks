import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Projects } from '../../../api/projects/projects.js';
import { Tasks } from '../../../api/tasks/tasks.js';

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
    return Tasks.find({});
  },
});

Template.Tasks.events({
  "submit form": function(event) {
    event.preventDefault();

    const task = event.target.newTask;

    Tasks.insert({ title: task.value });

    task.value = '';
  }
});
