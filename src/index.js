const Backbone = require('backbone');
const App = require('./router');


const app = new App();

console.log('starting');
Backbone.history.start();
