import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Projects } from '../../../api/projects/projects.js';
import { Tasks } from '../../../api/tasks/tasks.js';

import './task_item.js';
import './tasks.html';

Template.tasksList.onCreated(function() {
  this.projectID = () => FlowRouter.getParam('id');

  this.autorun(() => {
    this.subscribe('tasks', this.projectID());
  });
});

Template.tasksList.onRendered(function() {
  this.$('#tasks').sortable({
    stop: (e, ui) => {
      const el = ui.item.get(0);
      const before = ui.item.prev().get(0);
      const after = ui.item.next().get(0);

      const b_el = Blaze.getData(el);
      const oldRank = b_el.rank;

      let newRank;

      if (!before) {
        newRank = 1;
        Meteor.call('tasks.moveToFirst', oldRank);
      } else if (!after) {
        const b_before = Blaze.getData(before);
        const b_el = Blaze.getData(el);

        if (b_el.rank < b_before.rank) {
          newRank = b_before.rank;
          Meteor.call('tasks.moveToLast', oldRank);
        }
      } else {
        const b_before = Blaze.getData(before);
        newRank = b_before.rank;
        let diff = newRank - oldRank;
        let start = oldRank + 1;
        let end = newRank;
        let inc = -1;

        if (diff < 0) {
          newRank += 1;
          diff += 1;
          end = oldRank;
          start = newRank;
          inc = 1;
        }

        Meteor.call('tasks.moveBetween', start, end, inc);
      }

      Meteor.call('tasks.updateRank', b_el._id, newRank, (err) => {
        if (err) {
          console.log(err.reason);
          return;
        }
      });
    }
  });
});

Template.tasksList.helpers({
  projectTitle() {
    const projectID = FlowRouter.getParam('id');
    const project = Projects.findOne(projectID);

    if (project) {
      return project.title;
    }
  },

  tasks() {
    const projectID = FlowRouter.getParam('id');

    return Tasks.find({projectID}, { $sort: { rank: 1 } });
  },

  isOwner() {
    const projectID = FlowRouter.getParam('id');
    const project = Projects.findOne(projectID);
    return project.owner===Meteor.userId();
  },
});

Template.tasksList.events({
  "submit form": function(event) {
    event.preventDefault();

    const projectID = FlowRouter.getParam('id');
    const task = event.target.newTask;

    Meteor.call('tasks.insert', projectID, {
      title: task.value,
    });

    task.value = '';
  },

  "click .delete_tasks_done": function(event) {
    event.preventDefault();

    const projectID = FlowRouter.getParam('id');

    Meteor.call('tasks.deleteDone', projectID, (err) => {
      if (err) {
        console.log(err.reason);
      }
    });
  }
});
