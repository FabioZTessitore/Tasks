import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/main_layout.js';
import '../../ui/layouts/accounts_layout.js';
import '../../ui/components/splash.html';
import '../../ui/components/splash_projects.html';
import '../../ui/templates/register/register.js';
import '../../ui/templates/login/login.js';
import '../../ui/templates/tasks/tasks.js';

FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('AccountsLayout', { content: 'splash' });
  },
});

FlowRouter.route('/projects', {
  name: 'projects',
  action() {
    BlazeLayout.render('MainLayout', { content: 'splashProjects' });
  },
});

FlowRouter.route('/signup', {
  name: 'signup',
  action() {
    BlazeLayout.render('AccountsLayout', { content: 'register' });
  },
});

FlowRouter.route('/login', {
  name: 'login',
  action() {
    BlazeLayout.render('AccountsLayout', { content: 'login' });
  },
});

FlowRouter.route('/projects/:id', {
  name: 'projects',
  action() {
    BlazeLayout.render('MainLayout', { content: 'tasksList' });
  },
});
