import { Template } from 'meteor/templating';

import { Tasks } from '../../../api/tasks/tasks.js';

import './task_item.html';

Template.taskItem.helpers({
  taskDone() {
    return this.done ? "text-muted bg-success done" : '';
  },

  done_strike() {
    return this.done ? 'done' : ''; 
  },

  checked() {
    return this.done ? 'checked' : '';
  }
});

Template.taskItem.events({
  "click": function(event) {
    event.preventDefault();

    const taskID = this._id;
    Tasks.update(taskID, {
      $set: { done: !this.done }
    });
  },
});
