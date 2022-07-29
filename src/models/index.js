const Backbone = require('backbone');
const _ = require('underscore');

const localStorage = require('backbone.localstorage');


const {LocalStorage} = localStorage;

const models = {};

models.Note = Backbone.Model.extend({
	defaults: {
		title: '',
		author: '',
		description: '',
	},
	validate(attribute){
		const errors = {};
		if (!attribute.title) errors.title = 'Missing title';
		if (!attribute.author) errors.author = 'Missing author';
		if (!attribute.description) errors.description = 'Missing description';

		if (_.isEmpty(errors)){
			return;
		}
		return errors;
	},
});

models.NotesList = Backbone.Collection.extend({
	model: models.Note,
	localStorage: new LocalStorage('Notes'),
});

module.exports = models;
