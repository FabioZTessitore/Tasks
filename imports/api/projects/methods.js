import { Meteor } from 'meteor/meteor';

import { Projects } from './projects.js';

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
    };
    const _id = Projects.insert(project);

    return {
      _id
    };
  }
});
