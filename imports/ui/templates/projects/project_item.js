import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './project_item.html';

Template.ProjectItem.helpers({
  active() {
    return this._id===FlowRouter.getParam('id') ? 'active' : '';
  }
});

Template.ProjectItem.onRendered(function() {
  const el = $(this.find('.project-title'));

  el.addClass('animated rollIn');
  Meteor.setTimeout(() => {
    el.removeClass("animated rollIn");
  }, 1500);
});

Template.ProjectItem.events({
  "click": function(event) {
    event.preventDefault();

    const projectID = this._id;

    FlowRouter.go('/projects/'+projectID);
  },

  "click .trash": function(event) {
    event.preventDefault();

    const projectID = this._id;

    $(event.target).closest('.project-title').addClass('animated hinge');
    Meteor.setTimeout(() => {
      Meteor.call('projects.remove', projectID);
    }, 2000);
  },
});
