import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/main_layout.js';
import '../../ui/components/splash.html';
import '../../ui/templates/tasks/tasks.js';

FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('MainLayout', { content: 'Splash' });
  },
});

FlowRouter.route('/projects/:id', {
  name: 'projects',
  action() {
    BlazeLayout.render('MainLayout', { content: 'Tasks' });
  },
});
