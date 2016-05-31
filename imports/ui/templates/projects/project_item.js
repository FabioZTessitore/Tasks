import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './project_item.html';

Template.ProjectItem.events({
  "click": function(event) {
    event.preventDefault();

    const projectID = this._id;

    FlowRouter.go('/projects/'+projectID);
  },
});
