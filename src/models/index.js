
const Backbone = require('backbone');

const models = {};

models.Notes = Backbone.Model.extend({
	defaults: {
		title: '',
		author: '',
		description: '',
	},
});

models.NotesList = Backbone.Collection.extend({
	model: this.Notes,
});


module.exports = models;
