import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

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
    const done = !this.done;

    Meteor.call('tasks.toggleDone', taskID, done, (err) => {
      if (err) {
        console.log(err.reason);
      }
    });
  },
});
