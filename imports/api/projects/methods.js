import { Meteor } from 'meteor/meteor';

import { Projects } from './projects.js';
import { Tasks } from '../tasks/tasks.js';

import { check } from 'meteor/check';

Meteor.methods({
  "projects.insert": (projectAttributes) => {
    check(projectAttributes, {
      title: String
    });

    const sameTitleProject = Projects.findOne({
      title: projectAttributes.title
    });
    if (sameTitleProject) {
      return {
        _id: sameTitleProject._id,
        exists: true
      };
    }

    const project = {
      title: projectAttributes.title,
      createdAt: new Date(),
      owner: Meteor.userId(),
    };
    const _id = Projects.insert(project);

    return {
      _id
    };
  },

  "projects.remove": (projectID) => {
    check(projectID, String);

    const project = Projects.findOne(projectID);
    if (project.owner!==Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.remove({ projectID });
    Projects.remove({ _id: projectID });
  },
});
