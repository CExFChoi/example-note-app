const Backbone = require('backbone');
const {NotesSection, NoteForm} = require('../views');
const {Note, NotesList} = require('../models');

const Router = Backbone.Router.extend({
	routes: {
		index: 'home',
		new: 'new',
		'edit/:id': 'edit',
		'delete/:id': 'delete',

	},
	home(){
		console.log('home');
		const noteSection = new NotesSection(this.notesList);
	},
	new(){
		console.log('new');
		const noteForm = new NoteForm({noteList: this.notesList, note: new models.Note()});
		// noteForm.render();
	},

	edit(id){
		console.log('editing note id', id);
		const noteForm = new NoteForm({noteList: this.notesList, note: this.notesList.get(id)});
		// noteForm.render();
	},

	delete(id){},

	initialize(){
		this.notesList = new NotesList();
		this.notesList.fetch({ajaxSync: false});

		const tempNote = new Note({ title: 'test title', author: 'test Author', description: 'Test description'});
		this.notesList.add(tempNote);

		tempNote.save();

		console.log(this.notesList.localStorage, this);

		this.home();
		this.start();
		// everything you need to initialize you app
	},
	start(){
		console.log('starting');
		Backbone.history.start({pushState: true});
	},
});

module.exports = Router;
