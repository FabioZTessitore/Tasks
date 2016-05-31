import { Template } from 'meteor/templating';

import { Projects } from '../../../api/projects/projects.js';

import './project_item.js';
import './projects.html';

Template.ProjectsList.helpers({
  projects() {
    return Projects.find({}, { sort: { title: 1 } });
  },
});

Template.ProjectsList.events({
  "submit form": function(event) {
    event.preventDefault();

    const title = event.target.title;

    Projects.insert({ title: title.value });

    title.value = '';
  },
});
