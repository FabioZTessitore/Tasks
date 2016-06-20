import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Projects } from '../../../api/projects/projects.js';
import { Errors } from '../errors/errors_collection.js';

import './project_item.js';
import './projects.html';

Template.ProjectsList.onCreated(function() {
    const self = this;
    self.autorun(() => {
        self.subscribe('projects');
  });
});

Template.ProjectsList.helpers({
    Projects() {
        return Projects;
    },

  projects() {
    return Projects.find({}, { sort: { title: 1 } });
  },
});

Template.ProjectsList.events({
  "submit form": function(event) {
    event.preventDefault();

    const title = event.target.title;

    Meteor.call('projects.insert', {
      title: $.trim(title.value)
    }, function(err, result) {
      if (err) {
        throw new Meteor.Error(err.reason);
      }

      if (result.exists) {
        Errors.insert({ message: "esiste gia' un progetto con questo nome" });
      }
    });

    title.value = '';
  },
});
