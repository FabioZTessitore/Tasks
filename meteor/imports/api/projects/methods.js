import { Meteor } from 'meteor/meteor';

import { Projects } from './projects.js';
import { Tasks } from '../tasks/tasks.js';

import { check } from 'meteor/check';

Meteor.methods({
  "projects.insert": (projectAttributes) => {
    const project = Projects.simpleSchema().clean(projectAttributes);

    const sameTitleProject = Projects.findOne({
        title: projectAttributes.title,
        owner: this.userId,
    });
    if (sameTitleProject) {
        return {
            _id: sameTitleProject._id,
            exists: true
        };
    }

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
