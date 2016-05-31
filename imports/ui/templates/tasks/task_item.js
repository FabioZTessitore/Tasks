import { Template } from 'meteor/templating';

import './task_item.html';

Template.taskItem.events({
  "click": function(event) {
    event.preventDefault();

    const taskID = this._id;
    console.log(taskID);
  },
});
