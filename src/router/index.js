const Backbone = require('backbone');
const {NotesSection, NoteForm, DebugSection} = require('../views');
const {Note, NotesList } = require('../models');

const Router = Backbone.Router.extend({
	routes: {
		index: 'home',
		new: 'new',
		'edit/:id': 'edit',
		'delete/:id': 'delete',
	},
	home(){
		this.notesList.fetch({ajaxSync: false});
		 new DebugSection(this.notesList); /* eslint-disable-line */
		this.loadView(new NotesSection(this.notesList));
	},
	new(){
		this.loadView(new NoteForm({noteList: this.notesList, note: new Note(), type: 'Create'}));
	},

	edit(id){
		this.loadView(new NoteForm({noteList: this.notesList, note: this.notesList.get(id), type: 'Edit'}));
	},

	delete(id){
		const note = this.notesList.get(id);
		note.destroy();
		Backbone.history.navigate('index', {trigger: true});
	},

	initialize(){
		this.notesList = new NotesList();
		this.notesList.fetch({ajaxSync: false});
		this.view = '';
		this.home();
		this.start();
		// everything you need to initialize you app
	},
	loadView(view) {
		if (this.view) this.view.remove();
		this.view = view;
	},
	start(){
		Backbone.history.start({pushState: false});
	},
});

module.exports = Router;
