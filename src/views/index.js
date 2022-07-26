const Backbone = require('backbone');
const _ = require('underscore');

const views = {};


views.NoteForm = Backbone.View.extend({
	el: '#container',
	template: require('../templates/noteForm.dust'),

	intialize() {
		console.log('initial render of form section');
		this.render();
	},
	render(){
		dust.render(this.template, {}, function (err, out) {
		// `out` contains the rendered output.
			this.$el.append(out);
		}.bind(this));
	},
	events: {},
});


views.NotesSection = Backbone.View.extend({

	el: '#container',
	template: _.template('<h2>Hello <%= who %></h2>'),
	initialize(){
		console.log('initial render of note section');
		this.render();
	},
	render(){
		this.$el.append(this.template({who: 'Fabs'}));
	},
	events: {

	},
});

module.exports = views;
