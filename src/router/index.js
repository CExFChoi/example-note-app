const Backbone = require('backbone');
const views = require('../views');

console.log(views);

const router = Backbone.Router.extend({
	routes: {
		'': 'home',
	},
	home(){
		//const notesSection = new views.NotesSection();
		const noteForm = new views.NoteForm();
		noteForm.render();
	},
	initialize(){


		// everything you need to initialize you app
	},
	start(){
		Backbone.history.start();
	},

});

module.exports = router;
