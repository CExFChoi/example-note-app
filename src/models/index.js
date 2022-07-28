const models = {};

models.Note = Backbone.Model.extend({
	defaults: {
		title: '',
		author: '',
		description: '',
	},
	validate(attribute){
		const errors = {};
		if (!attribute.title) errors.title = 'Need a title';
		if (!attribute.author) errors.author = 'Need a author';
		if (!attribute.description) errors.description = 'Need a description';

		if (_.isEmpty(errors)){
			return;
		}
		return errors;
	},
});

models.NotesList = Backbone.Collection.extend({
	model: models.Note,
	localStorage: new Backbone.LocalStorage('Notes'),
});
