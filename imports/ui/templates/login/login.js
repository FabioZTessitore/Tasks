import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Errors } from '../errors/errors_collection.js';
import './login.html';

Template.login.events({
  "submit form": function(e, instance) {
    e.preventDefault();

    const userAttributes = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    Meteor.loginWithPassword(userAttributes.username, userAttributes.password, function(err) {
      if (err) {
        Errors.insert({ message: err.reason });
        return;
      }

      FlowRouter.go('/projects');
    });
  }
});
