import { Template } from 'meteor/templating';

import { Errors } from './errors_collection.js';

import './errors.html';

Template.errors.helpers({
  errors() {
    return Errors.find();
  }
});

Template.error.onRendered(() => {
  const instance = Template.instance();
  const id = instance.data._id;

  Meteor.setTimeout(() => {
    Errors.remove(id);
  }, 3000);
});
