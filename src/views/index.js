/* eslint-disable */
const Backbone = require('backbone');
const _ = require('underscore');
const dust = require('dustjs-linkedin');
require('../../lib/templates.js');

const views = {};

views.NoteForm = Backbone.View.extend({
	initialize({noteList, note, type}) {
		this.notesList = noteList;
		this.note = note;
		this.errorViews = [];
		this.type = type;
		$('#primary').html(this.el);
		this.render();
	},

	render(){
		this.removeErrors();
		dust.render('noteForm', {type: this.type, ...this.note.attributes}, function (err, out) {
		// `out` contains the rendered output.
			this.$el.html(out);
		}.bind(this));
	},
	events: {
		'submit #note-form': 'saveNote',
		'click #form-cancel': 'cancel',
	},
	removeErrors(){
		_.each(this.errorViews, function (error){
			error.remove();
		});
		this.errorViews = [];
	},
	cancel(event){
		this.removeErrors();
		Backbone.history.navigate('index', {trigger: true});
	},
	saveNote(event, id) {
		event.preventDefault();
		this.removeErrors();
		const prevValues = {...this.note.attributes};

		this.note.set({
			title: $('#form-title').val().trim(),
			author: $('#form-author').val().trim(),
			description: $('#form-description').val().trim(),
		});

		if (this.note.isValid()){
			this.notesList.add(this.note);
			this.note.save();
			this.removeErrors();
			Backbone.history.navigate('index', {trigger: true});
		} else {
			this.note.set(prevValues);

			_.mapObject(this.note.validationError, function (val, key){
				const error = new views.Error(val);
				$(`#form-${key}`).parent().after(error.render().$el);
				this.errorViews.push(error);
			}.bind(this));
		}
	},
});

views.Error = Backbone.View.extend({
	template: _.template('<div class="error-input"> <span class="text-danger"> <%= field %> </span> <div>'),
	initialize(field){
		this.field = field;
	},
	render(){
		this.$el = $('<div>').addClass('error-input');
		this.$el.html(this.template({field: this.field}));
		return this;
	},
	remove() {
		this.$el.remove();
		this.stopListening();
		return this;
	},
	events: {

	},
});

views.NotesSection = Backbone.View.extend({
	initialize(collection){
		this.notesList = collection.toJSON();
		$('#primary').html(this.el);
		// Get models from collection
		this.render();
	},
	render(){
		dust.render('notesList', {notes: this.notesList}, function (err, out) {
			// `out` contains the rendered output.
			this.$el.html(out);
		}.bind(this));
	},
});

views.DebugSection = Backbone.View.extend({
	el: '#secondary',
	initialize(collection){
		this.text = JSON.stringify(collection.toJSON(), null, 4);
		this.render();
	},
	render(){
		dust.render('debug', {text: this.text}, function (err, out) {
			this.$el.html(out);
		}.bind(this));
	},
});

module.exports = views;
