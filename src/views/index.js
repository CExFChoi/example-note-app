const Backbone = require('backbone');
const _ = require('underscore');

const views = {};

views.NoteForm = Backbone.View.extend({
	el: '#container',

	initialize({noteList, note}) {
		this.notesList = noteList;
		this.note = note;
		this.errorViews = [];
		this.render();
	},

	render(){
		dust.render(this.template, this.note.attributes, function (err, out) {
		// `out` contains the rendered output.
			this.$el.html(out);
		}.bind(this));
	},
	events: {
		'submit #note-form': 'saveNote',
	},

	saveNote(event, id) {
		event.preventDefault();
		_.each(this.errorViews, function (error){
			console.log('removing error', error);
			error.remove();
		});
		this.errorViews = [];

		this.note.set({
			title: $('#form-title').val().trim(),
			author: $('#form-author').val().trim(),
			description: $('#form-description').val().trim(),
		});

		if (this.note.isValid()){
			this.notesList.add(this.note);
			this.note.save();
			Backbone.history.navigate('index', {trigger: true});
		} else {
			_.mapObject(this.note.validationError, function (val, key){
				const error = new views.Error(val);
				error.setElement('.error-input');
				$(`#form-${key}`).after(error.render());
				this.errorViews.push(error);
				console.log(this.errorViews);
			}.bind(this));
		}
	},
});

views.Error = Backbone.View.extend({

	el: '.error-input',
	template: _.template('<div class="error-input"> <span> <%= field %> </span> <div>'),
	initialize(field){
		console.log('initial render of Error', field);
		this.field = field;
	},
	render(){
		// this.$el.after(this.template({field: this.field}));
		return this.template({field: this.field});
	},
	remove() {
		this.$el.empty();
		this.stopListening();
		return this;
	},
	events: {

	},
});


views.NotesSection = Backbone.View.extend({

	initialize(collection){
		console.log('collection', collection);
		this.notesList = collection.toJSON();
		console.log('initial render of note section and list', this.notesList);
		// Get models from collection
		this.render();
	},
	render(){
		dust.render('notesList', {notes: this.notesList}, function (err, out) {
			// `out` contains the rendered output.
			this.$el.html(out);
		}.bind(this));
	},
	events: {

	},
});

module.exports = views;
