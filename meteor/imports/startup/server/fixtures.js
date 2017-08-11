import { Projects } from '../../api/projects/projects.js';
import { Tasks } from '../../api/tasks/tasks.js';

if (Projects.find().count()===0) {
  //const id = Projects.insert({ title: "Grocery list" });
  //Tasks.insert({ projectID: id, done: false, title: "Heavy Whipping Cream", rank: 1 });
  //Tasks.insert({ projectID: id, done: true, title: "1 Garlic", rank: 2 });
  //Tasks.insert({ projectID: id, done: false, title: "Mushrooms (cèpe)", rank: 3});
  //Tasks.insert({ projectID: id, done: false, title: "Fresh Pasta", rank: 4 });
  //
  //Projects.insert({ title: "House Remodeling" });
  //Projects.insert({ title: "Learn HTML5" });
  //Projects.insert({ title: "Learn Meteor" });
}
