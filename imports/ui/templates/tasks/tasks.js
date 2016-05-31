import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Projects } from '../../../api/projects/projects.js';

import './tasks.html';

Template.Tasks.helpers({
  projectTitle() {
    const projectID = FlowRouter.getParam('id');
    const project = Projects.findOne(projectID);

    if (project) {
      return project.title;
    }
  }
});
